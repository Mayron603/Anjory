
'use server';

import { redirect } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import type { CartItem } from '@/lib/types';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

// To prevent "Topology is closed" errors in development,
// we cache the client and the database in the global scope.
let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

async function getDb() {
  if (cachedDb) {
    return cachedDb;
  }

  if (!cachedClient) {
     cachedClient = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });
    await cachedClient.connect();
  }
  
  cachedDb = cachedClient.db("Anjory");
  return cachedDb;
}


interface OrderDetails {
  cartItems: CartItem[];
  cartTotal: number;
  customer: {
    name: string;
    phone: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
  };
}

export async function placeOrder(details: OrderDetails) {
  const { cartItems, cartTotal, customer } = details;
  const session = await getSession();
  
  if (!session?.userId) {
    return { error: 'Usuário não autenticado. Faça login para continuar.' };
  }

  // 1. Generate a unique Order ID
  const orderId = `ANJ-${Math.floor(Date.now() / 1000)}-${Math.floor(Math.random() * 900 + 100)}`;

  // 2. Save order to MongoDB
  const orderPayloadForDB = {
    orderId,
    userId: session?.userId ? new ObjectId(session.userId) : null,
    customer,
    items: cartItems.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      slug: item.product.slug,
      image: item.product.images[0],
      quantity: item.quantity,
      price: item.product.price,
    })),
    total: cartTotal,
    status: 'pending',
    createdAt: new Date(),
  };

  try {
    const db = await getDb();
    await db.collection('orders').insertOne(orderPayloadForDB);
    console.log("Order saved to DB:", orderId);
  } catch (e) {
    console.error("Failed to save order to DB:", e);
    // Optionally return an error to the user
    return { error: 'Não foi possível salvar o pedido no banco de dados.' };
  }


  // 3. Format message for Discord Webhook
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  const fullAddress = `${customer.street}, ${customer.number} - ${customer.neighborhood}, ${customer.city}/${customer.state} - CEP: ${customer.zip}`;
  const discordPayload = {
    content: "🎉 **Novo Pedido Recebido na Anjory!** 🎉",
    embeds: [
      {
        title: "🛒 Detalhes do Pedido",
        color: 1190991, // #122c4f
        thumbnail: {
          url: "https://cdn.discordapp.com/attachments/1207833625870073857/1434208091154550957/Pastel_Purple_Retro_Bold_Cafe_Logo__4_-removebg-preview_1.png?ex=69077ddf&is=69062c5f&hm=14f77e60f6fdf789b094150821c6d3c79b527871cd5ccedca5a8bda01a864d15&"
        },
        fields: [
          { name: "ID do Pedido", value: `**${orderId}**` },
          { name: "Cliente", value: customer.name || "Não informado", inline: true },
          { name: "Telefone", value: customer.phone || "Não informado", inline: true },
          { name: "Endereço de Entrega", value: fullAddress || "Não informado" },
          {
            name: "Itens do Pedido",
            value: cartItems.map(item => `• ${item.product.name} (x${item.quantity}) - ${formatPrice(item.product.price * item.quantity)}`).join('\n')
          },
          { name: "Valor Total", value: `**${formatPrice(cartTotal)}**`, inline: false },
        ],
        timestamp: new Date().toISOString(),
        footer: {
          text: "Anjory Store",
          icon_url: "https://cdn.discordapp.com/attachments/1207833625870073857/1434208091154550957/Pastel_Purple_Retro_Bold_Cafe_Logo__4_-removebg-preview_1.png?ex=69077ddf&is=69062c5f&hm=14f77e60f6fdf789b094150821c6d3c79b527871cd5ccedca5a8bda01a864d15&"
        }
      }
    ]
  };

  if (webhookUrl) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discordPayload),
        });
        if (!response.ok) {
          console.error('Failed to send Discord notification:', response.statusText);
        }
      } catch (error) {
        console.error("Failed to send Discord notification:", error);
      }
  }


  // 4. Format message for WhatsApp
  const phoneNumber = process.env.WHATSAPP_PHONE_NUMBER;
  let whatsappMessage = `Olá! 👋 Gostaria de finalizar minha compra com os seguintes itens: 🛍️\n\n`;
  cartItems.forEach(item => {
    whatsappMessage += `🛒 *${item.product.name}* (x${item.quantity}) - ${formatPrice(item.product.price * item.quantity)}\n`;
  });
  whatsappMessage += `\n*Total do Pedido: ${formatPrice(cartTotal)}* 💰\n\n`;
  whatsappMessage += `*Meus Dados para Entrega:* 🚚\n`;
  whatsappMessage += `Nome: ${customer.name}\n`;
  whatsappMessage += `Telefone: ${customer.phone} 📱\n`;
  whatsappMessage += `Endereço: ${fullAddress}\n`;
  whatsappMessage += `\n*ID do Pedido: ${orderId}*`;
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  
  // 5. Redirect user
  // This will be caught by the frontend to open the URL
  return { whatsappUrl };
}

export async function signUp(prevState: any, data: FormData) {
  const name = data.get('name') as string;
  const email = data.get('email') as string;
  const password = data.get('password') as string;

  if (!name || !email || !password) {
    return { error: 'Todos os campos são obrigatórios.' };
  }

  let db;
  try {
    db = await getDb();
    
    // Check if user already exists
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return { error: 'Este e-mail já está em uso.' };
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the new user to the database
    const newUserResult = await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    // Create session for the new user
     const sessionPayload = {
      userId: newUserResult.insertedId.toString(),
      email: email,
      name: name,
    };
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    const session = await encrypt(sessionPayload);
    cookies().set('session', session, { expires, httpOnly: true });


  } catch (e) {
    console.error("Erro no registro:", e);
    return { error: 'Ocorreu um erro durante o registro. Tente novamente.' };
  }
  
  // Redirect to home page after successful registration and login
  redirect('/');
}


const secretKey = process.env.JWT_SECRET;
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key);
}

export async function decrypt(input: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(input, key, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    // This can happen if the token is expired or invalid
    return null;
  }
}

export async function signIn(prevState: any, data: FormData) {
  const email = data.get('email') as string;
  const password = data.get('password') as string;

  if (!email || !password) {
    return { error: 'E-mail e senha são obrigatórios.' };
  }
  
  let user;
  try {
    const db = await getDb();
    
    // Find user by email
    user = await db.collection('users').findOne({ email });
    if (!user) {
      return { error: 'Credenciais inválidas.' };
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) {
      return { error: 'Credenciais inválidas.' };
    }
  } catch (e) {
      console.error("Erro no login:", e);
      return { error: 'Ocorreu um erro durante o login. Tente novamente.' };
  }
  
  // Create the session payload
  const sessionPayload = {
    userId: user._id.toString(),
    email: user.email,
    name: user.name,
    phone: user.phone,
    street: user.street,
    number: user.number,
    neighborhood: user.neighborhood,
    city: user.city,
    state: user.state,
    zip: user.zip,
  };

  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
  const session = await encrypt(sessionPayload);

  cookies().set('session', session, { expires, httpOnly: true });

  redirect('/');
}

export async function signOut() {
  cookies().set('session', '', { expires: new Date(0) });
  revalidatePath('/', 'layout');
  redirect('/login');
}

export async function getSession() {
    const cookie = cookies().get('session')?.value;
    if (!cookie) return null;
    const session = await decrypt(cookie);
    if (!session?.userId) return null;
    
    // Fetch the latest user data from the database to ensure it's fresh
    try {
        const db = await getDb();
        const user = await db.collection('users').findOne({ _id: new ObjectId(session.userId) });
        if (!user) return null; // User might have been deleted

        // Return a consistent session object, excluding sensitive data like password
        return {
            userId: user._id.toString(),
            email: user.email,
            name: user.name,
            phone: user.phone,
            street: user.street,
            number: user.number,
            neighborhood: user.neighborhood,
            city: user.city,
            state: user.state,
            zip: user.zip,
        };
    } catch (e) {
        console.error("Failed to fetch fresh session data:", e);
        return null;
    }
}

export async function getOrders() {
    const session = await getSession();
    if (!session?.userId) {
        return [];
    }

    try {
        const db = await getDb();
        const orders = await db.collection('orders')
            .find({ userId: new ObjectId(session.userId) })
            .sort({ createdAt: -1 })
            .toArray();

        // Convert ObjectId to string for client-side usage
        return orders.map(order => ({
            ...order,
            _id: order._id.toString(),
            userId: order.userId.toString(),
        }));
    } catch (e) {
        console.error("Failed to fetch orders:", e);
        return [];
    }
}
    
export async function updateUser(prevState: any, data: FormData) {
  const session = await getSession();
  if (!session?.userId) {
    return { error: 'Usuário não autenticado.' };
  }

  const name = data.get('name') as string;
  const email = data.get('email') as string;
  const phone = data.get('phone') as string;
  const zip = data.get('zip') as string;
  const street = data.get('street') as string;
  const number = data.get('number') as string;
  const neighborhood = data.get('neighborhood') as string;
  const city = data.get('city') as string;
  const state = data.get('state') as string;


  if (!name || !email) {
    return { error: 'Nome e e-mail são obrigatórios.' };
  }

  const updateData = {
    name,
    email,
    phone,
    zip,
    street,
    number,
    neighborhood,
    city,
    state,
  };


  try {
    const db = await getDb();
    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(session.userId) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return { error: 'Usuário não encontrado.' };
    }
    
    // Revalidate the profile path to show the updated data
    revalidatePath('/profile');
    revalidatePath('/api/session'); // Also revalidate the session API route

    return { success: 'Dados atualizados com sucesso!' };

  } catch (e: any) {
    console.error("Erro ao atualizar dados:", e);
     if (e.code === 11000) { // Duplicate key error for email
      return { error: 'Este e-mail já está em uso por outra conta.' };
    }
    return { error: 'Ocorreu um erro ao atualizar os dados.' };
  }
}

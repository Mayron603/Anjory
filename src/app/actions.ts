
'use server';

import { redirect } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import type { CartItem } from '@/lib/types';
import { MongoClient, ObjectId, ServerApiVersion } from 'mongodb';
import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db;

async function getDb() {
  if (db) {
    return db;
  }
  await client.connect();
  db = client.db("Anjory");
  return db;
}


interface OrderDetails {
  cartItems: CartItem[];
  cartTotal: number;
  customer: {
    name: string;
    phone: string;
    address: string;
    city: string;
    zip: string;
  };
}

export async function placeOrder(details: OrderDetails) {
  const { cartItems, cartTotal, customer } = details;
  const session = await getSession();

  // 1. Generate a unique Order ID
  const orderId = `ANJ-${Math.floor(Date.now() / 1000)}-${Math.floor(Math.random() * 900 + 100)}`;

  // 2. Save order to MongoDB
  const orderPayloadForDB = {
    orderId,
    userId: session?.user?.userId ? new ObjectId(session.user.userId) : null,
    customer,
    items: cartItems.map(item => ({
      productId: item.product.id,
      name: item.product.name,
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
          { name: "Endereço de Entrega", value: `${customer.address}, ${customer.city} - CEP: ${customer.zip}` || "Não informado" },
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
  whatsappMessage += `Endereço: ${customer.address}, ${customer.city}, ${customer.zip}\n`;
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

  try {
    const db = await getDb();
    
    // Verificar se o usuário já existe
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return { error: 'Este e-mail já está em uso.' };
    }

    // Criptografar a senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Salvar o novo usuário no banco de dados
    await db.collection('users').insertOne({
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

  } catch (e) {
    console.error("Erro no registro:", e);
    return { error: 'Ocorreu um erro durante o registro. Tente novamente.' };
  }
  
  // Redireciona para a página de login após o registro bem-sucedido
  redirect('/login');
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
    
    // Encontrar o usuário pelo e-mail
    user = await db.collection('users').findOne({ email });
    if (!user) {
      return { error: 'Credenciais inválidas.' };
    }

    // Comparar a senha
    const isPasswordValid = await bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) {
      return { error: 'Credenciais inválidas.' };
    }
  } catch (e) {
      console.error("Erro no login:", e);
      return { error: 'Ocorreu um erro durante o login. Tente novamente.' };
  }
  
  // Criar a sessão
  const sessionPayload = {
    userId: user._id.toString(),
    email: user.email,
    name: user.name,
  };

  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
  const session = await encrypt(sessionPayload);

  cookies().set('session', session, { expires, httpOnly: true });

  redirect('/');
}

export async function signOut() {
  cookies().set('session', '', { expires: new Date(0) });
  redirect('/login');
}

export async function getSession() {
    const cookie = cookies().get('session')?.value;
    if (!cookie) return null;
    return await decrypt(cookie);
}

export async function getOrders() {
    const session = await getSession();
    if (!session?.user?.userId) {
        return [];
    }

    try {
        const db = await getDb();
        const orders = await db.collection('orders')
            .find({ userId: new ObjectId(session.user.userId) })
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
    

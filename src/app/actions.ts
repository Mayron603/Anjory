
'use server';

import { redirect } from 'next/navigation';
import { formatPrice } from '@/lib/utils';
import type { CartItem } from '@/lib/types';
import { MongoClient, ServerApiVersion } from 'mongodb';
import bcrypt from 'bcryptjs';

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

async function getDb() {
    await client.connect();
    return client.db("Anjory");
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

  // 1. Generate a unique Order ID
  const orderId = `ANJ-${Math.floor(Date.now() / 1000)}-${Math.floor(Math.random() * 900 + 100)}`;

  // 2. Save order to MongoDB
  const orderPayloadForDB = {
    orderId,
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

export async function signIn(prevState: any, data: FormData) {
  const email = data.get('email') as string;
  const password = data.get('password') as string;

  if (!email || !password) {
    return { error: 'E-mail e senha são obrigatórios.' };
  }
  
  try {
    const db = await getDb();
    
    // Encontrar o usuário pelo e-mail
    const user = await db.collection('users').findOne({ email });
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
  
  // TODO: Se as credenciais estiverem corretas, crie uma sessão.
  // Isso geralmente envolve o uso de cookies ou JWT.
  // Ex: import { cookies } from 'next/headers'
  // cookies().set('session', '...', { httpOnly: true, path: '/' });
  
  redirect('/');
}

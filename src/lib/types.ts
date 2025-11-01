export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  slug: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Order = {
  _id: string;
  orderId: string;
  userId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    state: string;
    zip: string;
  };
  items: {
    productId: string;
    name: string;
    slug: string;
    image: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  status: 'Pendente' | 'Enviado' | 'Entregue' | 'Cancelado';
  createdAt: Date;
};

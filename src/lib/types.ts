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
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    zip: string;
    country: string;
  };
};

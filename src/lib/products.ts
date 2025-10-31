import type { Product } from '@/lib/types';

const products: Product[] = [
  {
    id: 'adesivos-criativos',
    slug: 'adesivos-criativos',
    name: 'Adesivos Criativos',
    description: 'Cartelas de adesivos com designs exclusivos para personalizar seus objetos. Alta qualidade e durabilidade.',
    price: 15.00,
    images: ['adesivos-criativos-1'],
    category: 'Papelaria'
  },
  {
    id: 'album-figurinhas',
    slug: 'album-figurinhas',
    name: 'Álbum de Figurinhas',
    description: 'Um álbum de figurinhas temático para colecionar e se divertir. Acompanha pacotes de figurinhas iniciais.',
    price: 45.90,
    images: ['album-figurinhas-1'],
    category: 'Papelaria'
  },
  {
    id: 'bloco-de-notas',
    slug: 'bloco-de-notas',
    name: 'Bloco de Notas',
    description: 'Bloco de notas com folhas destacáveis e pautadas, perfeito para o dia a dia. Capa com design elegante.',
    price: 22.50,
    images: ['bloco-de-notas-1'],
    category: 'Papelaria'
  },
  {
    id: 'caderno-personalizado',
    slug: 'caderno-personalizado',
    name: 'Caderno Personalizado',
    description: 'Caderno de capa dura com 96 folhas. Escolha uma de nossas estampas exclusivas para a capa.',
    price: 55.00,
    images: ['caderno-personalizado-1'],
    category: 'Papelaria'
  },
  {
    id: 'uno-personalizado',
    slug: 'uno-personalizado',
    name: 'UNO Personalizado',
    description: 'O clássico jogo UNO com um baralho de design temático e exclusivo da Anjory. Diversão garantida.',
    price: 65.00,
    images: ['uno-personalizado-1'],
    category: 'Jogos'
  },
  {
    id: 'vela-bulbos-medio',
    slug: 'vela-bulbos-medio',
    name: 'Vela Bulbos Médio',
    description: 'Vela aromática média em formato de bulbo. Feita com cera de coco e essências premium. Duração de 30 horas.',
    price: 59.90,
    images: ['vela-bulbos-medio-1'],
    category: 'Velas'
  },
  {
    id: 'vela-bulbos-mini',
    slug: 'vela-bulbos-mini',
    name: 'Vela Bulbos Mini',
    description: 'Uma mini vela aromática em formato de bulbo, perfeita para pequenos espaços e para criar um ambiente acolhedor.',
    price: 29.90,
    images: ['vela-bulbos-mini-1'],
    category: 'Velas'
  },
  {
    id: 'vela-pote-vidro',
    slug: 'vela-pote-vidro',
    name: 'Vela Pote de Vidro',
    description: 'Vela em pote de vidro com tampa de madeira. Disponível em diversos aromas. Duração de 45 horas.',
    price: 79.90,
    images: ['vela-pote-vidro-1'],
    category: 'Velas'
  },
];

export async function getProducts(): Promise<Product[]> {
  // In a real app, you would fetch this from a database.
  return Promise.resolve(products);
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return Promise.resolve(products.find(p => p.slug === slug));
}

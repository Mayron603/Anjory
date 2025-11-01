
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { getProducts } from '@/lib/products';
import { getImageById } from '@/lib/placeholder-images';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/product-card';

export default async function HomePage() {
  const products = await getProducts();
  const featuredProducts = products.slice(0, 4);
  const heroImage = getImageById('vela-pote-vidro-1');

  return (
    <div className="flex flex-col">
       {/* Hero Section */}
       <section className="relative w-full bg-secondary/30 overflow-hidden paint-splatter">
         <div className="container mx-auto min-h-[70vh] flex items-center justify-center relative z-10 py-16 md:py-0">
           <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8 w-full">
              {/* Image Section */}
              <div className="relative flex items-center justify-center h-96 md:h-auto">
                  <div className="relative w-full h-full max-w-sm">
                      {/* Main Polaroid */}
                      {heroImage && (
                          <div className="relative w-[300px] h-[350px] md:w-[320px] md:h-[370px] bg-white p-4 shadow-xl transform -rotate-6">
                              <div className="relative w-full h-full">
                                  <Image
                                      src={heroImage.imageUrl}
                                      alt={heroImage.description}
                                      data-ai-hint={heroImage.imageHint}
                                      fill
                                      className="object-cover"
                                      priority
                                      sizes="(max-width: 768px) 100vw, 50vw"
                                  />
                              </div>
                          </div>
                      )}
                  </div>
              </div>
            
           {/* Text Section */}
           <div className="text-center md:text-left flex flex-col items-center md:items-start relative z-20">
             <pre className="font-code text-xs bg-gray-100 dark:bg-gray-800 p-4 rounded-md overflow-x-auto text-left"><code>{`<changes>
  <description>[Provide a concise summary of the overall changes being made]</description>
  <change>
    <file>[Provide the ABSOLUTE, FULL path to the file being modified]</file>
    <content><![CDATA[Provide the ENTIRE, FINAL, intended content of the file here. Do NOT provide diffs or partial snippets. Ensure all code is properly escaped within the CDATA section.
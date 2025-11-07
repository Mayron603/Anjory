

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { DotButton, PrevButton, NextButton } from './ui/carousel-buttons';
import { cn } from '@/lib/utils';
import { Instagram } from 'lucide-react';
import Link from 'next/link';

const TWEEN_FACTOR = 1.2;

const instagramPosts: string[] = [
  "/products/vela-artesanal.png",
  "/products/vela-decorativa.png",
  "/products/planner-semanal.png",
  "/products/caderno-espiral.png",
  "/products/jogo-memoria.png",
  "/products/quebra-cabeca.png"
];

export const InstagramCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    slidesToScroll: 1,
    align: 'center'
  });
  const [tweenValues, setTweenValues] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;

    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();

    const styles = emblaApi.scrollSnapList().map((scrollSnap, index) => {
      let diffToTarget = scrollSnap - scrollProgress;

      if (engine.options.loop) {
        engine.slideLooper.loopPoints.forEach((loopItem) => {
          const target = loopItem.target();
          if (index === loopItem.index && target !== 0) {
            const sign = Math.sign(target);
            if (sign === -1) diffToTarget = scrollSnap - (1 + scrollProgress);
            if (sign === 1) diffToTarget = scrollSnap + (1 - scrollProgress);
          }
        });
      }
      return diffToTarget;
    });
    setTweenValues(styles);
  }, [emblaApi, setTweenValues]);

  useEffect(() => {
    if (!emblaApi) return;
    onScroll();
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('scroll', onScroll);
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onScroll);
  }, [emblaApi, onScroll, onSelect]);


  if (instagramPosts.length === 0) {
    return (
      <div className="text-center py-10 bg-muted/50 rounded-lg">
        <p className="text-muted-foreground">Adicione as URLs das imagens dos posts do Instagram em `src/components/instagram-carousel.tsx` para exibi-las aqui.</p>
      </div>
    )
  }

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4" style={{ perspective: '1000px' }}>
          {instagramPosts.map((src, index) => {
            const tweenValue = tweenValues[index] || 0;
            const opacity = 1 - Math.abs(tweenValue || 0) * 0.5;
            return (
              <div
                className="flex-shrink-0 flex-grow-0 basis-1/2 md:basis-1/3 min-w-0 pl-4 transition-transform duration-200 ease-out"
                key={index}
                style={{
                  transform: `
                    translateX(${tweenValue * 100}%) 
                    scale(${1 - Math.abs(tweenValue) * 0.2})
                    rotateY(${tweenValue * 20}deg)
                  `,
                  transformOrigin: '50% 50%',
                  opacity: isNaN(opacity) ? 0 : opacity,
                }}
              >
                <Link href="https://www.instagram.com/anjory.loja/" target="_blank" rel="noopener noreferrer" className="group relative block overflow-hidden rounded-lg aspect-[4/5]">
                  <Image
                    src={src}
                    alt={`Post do Instagram ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                   <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Instagram className="h-8 w-8 text-white" />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => scrollTo(index)}
            className={cn(
              'w-2 h-2 rounded-full bg-primary/20 transition-all duration-300',
              index === selectedIndex && 'w-4 bg-primary'
            )}
          />
        ))}
      </div>
       <div className="absolute top-1/2 left-4 -translate-y-1/2 hidden md:block">
        <PrevButton onClick={scrollPrev} />
       </div>
       <div className="absolute top-1/2 right-4 -translate-y-1/2 hidden md:block">
        <NextButton onClick={scrollNext} />
       </div>
    </div>
  );
};

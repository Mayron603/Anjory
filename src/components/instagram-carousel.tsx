

"use client";

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import useEmblaCarousel from 'embla-carousel-react';
import { DotButton, PrevButton, NextButton } from './ui/carousel-buttons';
import { cn } from '@/lib/utils';
import { Instagram } from 'lucide-react';
import Link from 'next/link';

const TWEEN_FACTOR = 1.2;

const instagramPosts = [
  "https://images.unsplash.com/photo-1594224456839-8a221f043105?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxzY2VudGVkJTIwY2FuZGxlfGVufDB8fHx8MTc2MTkxODU4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1518676590629-3797b8734631?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxqb3VybmFsaW5nfGVufDB8fHx8MTc2MTg2NDcyOHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1601120123589-9e0a5f434b9c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxoYW5kbWFkZSUyMGNhbmRsZXxlbnwwfHx8fDE3NjE5NjA4NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1599818816853-91d6b052140b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxhcnRpc3RpYyUyMHN0YXRpb25lcnl8ZW58MHx8fHwxNzYxODY0NzI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1495667496513-9068843d7679?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxjYW5kbGUlMjBsaWdodHxlbnwwfHx8fDE3NjE5NjA4NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1554189097-94915336de6d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjb3p5JTIwY2FuZGxlfGVufDB8fHx8MTc2MTkxODU4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1594997652537-2e2dce4ebf28?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxMHx8d3JpdGluZyUyMGpvdXJuYWx8ZW58MHx8fHwxNzYxODY0NzI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw1fHxzdGF0aW9uZXJ5fGVufDB8fHx8MTc2MTg2NDcyOHww&ixlib=rb-4.1.0&q=80&w=1080",
  "https://images.unsplash.com/photo-1612293905607-b003de9e54fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxjYW5kbGUlMjBtYWtpbmd8ZW58MHx8fHwxNzYxOTExNDc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
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

import React from 'react';
import Image from 'next/image';

export function Logo(props: React.ComponentProps<'div'>) {
  return (
    <div
      style={{ width: '200px', height: 'auto' }}
      {...props}
    >
      <Image
        src="/LOGO_panda.png"
        alt="Anjory Logo"
        width={200}
        height={40}
        priority
      />
    </div>
  );
}

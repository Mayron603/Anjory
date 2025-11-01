import React from 'react';
import Image from 'next/image';

export function Logo(props: React.ComponentProps<'div'>) {
  return (
    <div
      style={{ width: '150px', height: 'auto' }}
      {...props}
    >
      <Image
        src="/LOGO_panda.png"
        alt="Anjory Logo"
        width={150}
        height={30}
        priority
      />
    </div>
  );
}

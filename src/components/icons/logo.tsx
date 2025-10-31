import React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="200"
      height="40"
      viewBox="0 0 200 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Ms Madi, cursive"
        fontSize="36"
        fill="hsl(var(--foreground))"
      >
        Bloom & Ruby
      </text>
    </svg>
  );
}

import React from 'react';

export function Logo(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100"
      height="32"
      viewBox="0 0 100 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="PT Sans, sans-serif"
        fontSize="24"
        fontWeight="bold"
        fill="hsl(var(--foreground))"
      >
        Anjory
      </text>
    </svg>
  );
}

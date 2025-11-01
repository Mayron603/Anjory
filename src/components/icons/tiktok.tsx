import React from 'react';

export function TikTok(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16 4h4v4" />
      <path d="M12 4h-2a4 4 0 0 0-4 4v10" />
      <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z" />
    </svg>
  );
}

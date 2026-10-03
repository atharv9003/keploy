import React from 'react';

interface KeployLogoProps {
  className?: string;
  size?: number;
}

export default function KeployLogo({ className = '', size = 28 }: KeployLogoProps) {
  return (
    <div
      className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-tr from-[#FF6B35] to-[#FFA07A] text-white shadow-md shadow-orange-500/25 transition-transform group-hover:scale-105 shrink-0 ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      {/* Precision SVG Vector representation of the Keploy Rabbit */}
      <svg
        width={size * 0.68}
        height={size * 0.68}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-white"
      >
        {/* Left Ear */}
        <path
          d="M8 2C6.9 2 6 3.5 6.5 6L7.5 11C7.8 12.2 8.9 13 10.1 13H10.5C9.8 10 9.2 5 8 2Z"
          fill="currentColor"
          opacity="0.9"
        />
        {/* Right Ear */}
        <path
          d="M16 2C17.1 2 18 3.5 17.5 6L16.5 11C16.2 12.2 15.1 13 13.9 13H13.5C14.2 10 14.8 5 16 2Z"
          fill="currentColor"
          opacity="0.9"
        />
        {/* Head / Face */}
        <circle cx="12" cy="15" r="7" fill="currentColor" />
        {/* Eyes */}
        <ellipse cx="9.5" cy="14" rx="0.9" ry="1.2" fill="#0B0F17" />
        <ellipse cx="14.5" cy="14" rx="0.9" ry="1.2" fill="#0B0F17" />
        {/* Eye highlights */}
        <circle cx="9.2" cy="13.6" r="0.3" fill="white" />
        <circle cx="14.2" cy="13.6" r="0.3" fill="white" />
        {/* Cute Nose */}
        <polygon points="12,16 11.2,15.2 12.8,15.2" fill="#FF8555" />
      </svg>
    </div>
  );
}

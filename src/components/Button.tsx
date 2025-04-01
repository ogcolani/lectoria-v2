
import React from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button = ({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'font-medium rounded-lg transition-all duration-200 inline-flex items-center justify-center',
        {
          'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:opacity-90': variant === 'primary',
          'bg-white border border-gray-200 text-gray-800 hover:bg-gray-50': variant === 'secondary',
          'bg-transparent border border-purple-500 text-purple-500 hover:bg-purple-50': variant === 'outline',
          'text-sm px-4 py-2': size === 'sm',
          'text-base px-6 py-3': size === 'md',
          'text-lg px-8 py-4': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

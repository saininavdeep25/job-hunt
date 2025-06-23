// components/Button.js
import { forwardRef } from 'react';
import { Primitive } from '@radix-ui/react-primitive';
import clsx from 'clsx';

const Button = forwardRef(({ children, className, variant = 'default', ...props }, ref) => {
  const baseStyles = 'inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all';
  
  const variants = {
    default: ' hover:bg-indigo-700',
    outline: ' border border-gray-300 text-gray-700',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100',
  };

  const combinedClassName = clsx(baseStyles, variants[variant], className);

  return (
    <Primitive.button
      ref={ref}
      className={combinedClassName}
      {...props}
    >
      {children}
    </Primitive.button>
  );
});

Button.displayName = 'Button';

export default Button;

import * as React from 'react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';

// Avatar component
export const Avatar = ({ src, alt, fallback, size = 'medium' }) => {
  const getSizeClass = () => {
    switch (size) {
      case 'small':
        return 'w-8 h-8';
      case 'large':
        return 'w-16 h-16';
      default:
        return 'w-12 h-12'; // medium size
    }
  };

  return (
    <AvatarPrimitive.Root
      className={`inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-200 ${getSizeClass()}`}
    >
      <AvatarPrimitive.Image
        className="w-full h-full object-cover"
        src={src}
        alt={alt}
      />
      <AvatarPrimitive.Fallback
        className="flex items-center justify-center text-white bg-gray-400"
        delayMs={600}
      >
        {fallback}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};

export default Avatar;

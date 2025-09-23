import React, { useState } from 'react';
import { LoaderCircle } from 'lucide-react';

const ImageWithLoader = ({ src, alt, className,  }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative bg-[#5A2C40]/30 ${className}`}>
      {!isLoaded && (
        <div className="absolute inset-0 flex justify-center items-center">
          <LoaderCircle className="w-8 h-8 text-[#5A2C40] animate-spin" />
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover rounded-md transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setIsLoaded(true)}
      />
    </div>
  );
};

export default ImageWithLoader;
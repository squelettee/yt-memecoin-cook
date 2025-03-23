"use client";

import Image, { ImageProps } from "next/image";
import { useEffect, useState } from "react";

type DynamicImageProps = Omit<ImageProps, "src"> & {
  src?: string;
  file?: File;
  fallbackSrc: string;
};

export const DynamicImage = ({
  src,
  file,
  fallbackSrc,
  alt,
  ...props
}: DynamicImageProps) => {
  const [imageUrl, setImageUrl] = useState<string>(fallbackSrc);

  useEffect(() => {
    if (src) {
      setImageUrl(src);
    } else if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setImageUrl(fallbackSrc);
    }
  }, [src, file, fallbackSrc]);

  return <Image src={imageUrl} alt={alt} {...props} />;
}; 
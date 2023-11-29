import React, { FC } from "react";
import Image, { ImageProps } from "next/image";

export interface NcImageProps extends ImageProps {
  containerClassName?: string;
}

const NcImage: FC<NcImageProps> = ({
  containerClassName = "",
  alt = "nc-imgs",
  className = "object-cover w-full h-full",
  sizes = "(max-width: 600px) 480px, 800px",
  ...args
}) => {

  return (
    <div className={containerClassName}>
      <Image 
      className={className} 
      alt={alt} 
      sizes={sizes} 
      {...args} 
      placeholder="blur" 
      blurDataURL={"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAAECAIAAADETxJQAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAMUlEQVR4nGPIrOzOqWhbuHYvw7yNBxK9w/7/+s+g7xSiJaG+eeNBBgY2UUev6LKyZgByfxCvAnvQuAAAAABJRU5ErkJggg=="}
/>
    </div>
  );
};

export default NcImage;

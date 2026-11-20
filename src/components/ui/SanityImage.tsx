import Image, { type ImageProps } from "next/image";
import {
  urlForImage,
  getImageDimensions,
  type SanityImageSource,
} from "@/sanity/image";
import { cn } from "@/lib/cn";

export interface SanityImageProps extends Omit<ImageProps, "src" | "alt"> {
  image: SanityImageSource;
  alt?: string | null;
  lqip?: string | null;
  square?: boolean;
}

export function SanityImage({
  image,
  alt = "",
  lqip,
  square = false,
  className,
  width,
  height,
  ...props
}: SanityImageProps) {
  const src = urlForImage(image, {
    square,
    width: typeof width === "number" ? width : undefined,
    height: typeof height === "number" ? height : undefined,
  });

  if (!src) return null;

  const dimensions = getImageDimensions(image);

  return (
    <Image
      src={src}
      alt={alt || ""}
      width={props.fill ? undefined : (width ?? dimensions?.width)}
      height={props.fill ? undefined : (height ?? dimensions?.height)}
      placeholder={lqip ? "blur" : undefined}
      blurDataURL={lqip || undefined}
      unoptimized
      className={cn("object-cover", className)}
      {...props}
    />
  );
}

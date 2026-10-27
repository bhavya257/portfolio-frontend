import Image, { type ImageProps } from "next/image";
import {
  urlForImage,
  getImageDimensions,
  type SanityImageSource,
  type ImageTransformOptions,
} from "@/sanity/image";
import { cn } from "@/lib/cn";

export interface SanityImageProps extends Omit<ImageProps, "src" | "alt"> {
  image: SanityImageSource;
  alt?: string | null;
  lqip?: string | null;
  square?: boolean;
  options?: ImageTransformOptions;
}

export function SanityImage({
  image,
  alt = "",
  lqip,
  square = false,
  options,
  className,
  width,
  height,
  ...props
}: SanityImageProps) {
  const src = urlForImage(image, {
    square,
    ...(typeof width === "number" ? { width } : {}),
    ...(typeof height === "number" ? { height } : {}),
    ...options,
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
      className={cn("object-cover", className)}
      {...props}
    />
  );
}

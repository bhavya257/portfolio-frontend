import Image, { type ImageProps } from "next/image";
import { parseSanityImage, urlForImage, type SanityImageSource } from "@/sanity/image";
import { cn } from "@/lib/cn";

export interface SanityImageProps extends Omit<ImageProps, "src"> {
  image: SanityImageSource;
  lqip?: string;
}

export function SanityImage({
  image,
  alt = "",
  lqip,
  className,
  width,
  height,
  ...props
}: SanityImageProps) {
  const src = urlForImage(image, { direct: true });
  if (!src) return null;

  const { dimensions } = parseSanityImage(image);

  return (
    <Image
      src={src}
      alt={alt}
      width={props.fill ? undefined : (width ?? dimensions?.width)}
      height={props.fill ? undefined : (height ?? dimensions?.height)}
      placeholder={lqip ? "blur" : undefined}
      blurDataURL={lqip}
      className={cn("object-cover", className)}
      {...props}
    />
  );
}

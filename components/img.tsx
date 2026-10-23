import NextImage, { type ImageProps } from "next/image";
import { altFor } from "@/lib/content";

/** next/image with SEO defaults: an empty alt falls back to the photo's catalogued description, and title mirrors alt. */
export default function Image({ alt, title, ...props }: ImageProps) {
  const text = alt || (typeof props.src === "string" ? altFor(props.src) : "");
  return <NextImage alt={text} title={title ?? text} {...props} />;
}

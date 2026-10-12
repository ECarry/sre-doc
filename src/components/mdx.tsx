import defaultMdxComponents from "fumadocs-ui/mdx";
import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import { ImageZoom } from "fumadocs-ui/components/image-zoom";
import { Quiz } from "./quiz";

type ImageProps = ComponentProps<"img">;

function MdxImage(props: ImageProps) {
  if (!props.width || !props.height) return <img {...props} />;

  return <ImageZoom {...(props as any)} />;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    img: MdxImage,
    Quiz,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}

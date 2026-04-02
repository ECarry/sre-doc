import * as React from "react";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

// use this function to get MDX components, you will need it for rendering MDX
export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    img: function MdxImg(props: React.ImgHTMLAttributes<HTMLImageElement>) {
      return (
        <img
          {...props}
          style={{
            maxWidth: "100%",
            height: "auto",
            ...props.style,
          }}
        />
      );
    },
    ...components,
  };
}

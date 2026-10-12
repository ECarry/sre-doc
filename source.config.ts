import { defineConfig, defineDocs } from 'fumadocs-mdx/config';
import { metaSchema, pageSchema } from 'fumadocs-core/source/schema';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import { remarkHighlightMark } from 'remark-highlight-mark';

const remarkHighlightToMark = () => (tree: any) => {
  const visit = (node: any) => {
    if (node.type === 'highlight') {
      node.data = { ...node.data, hName: 'mark' };
    }

    for (const child of node.children ?? []) visit(child);
  };

  visit(tree);
};


// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  dir: 'content/docs',
  docs: {
    schema: pageSchema,
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath, remarkHighlightMark, remarkHighlightToMark],
    rehypePlugins: (plugins) => [rehypeKatex, ...plugins],
    remarkImageOptions: {
      external: false,
    },
  },
});

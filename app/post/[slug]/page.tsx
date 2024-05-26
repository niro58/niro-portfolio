import { MdxContent } from "@/components/mdx/mdx-content";
import { TableOfContents } from "@/components/post-table-of-contents";
import { Badge } from "@/components/ui/badge";
import { GetPost } from "@/lib/api-utils/api-utils-post";
import { DateToString } from "@/lib/dateToString";
import { serialize } from "next-mdx-remote/serialize";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await GetPost(slug);

  const { frontmatter, content } = post;
  if (!frontmatter || !content) {
    return <div>Not found</div>;
  }
  
  const serialized = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeCodeTitles, rehypePrism as any]
    }
  });
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-900">
      <div className="container w-1/2 pt-16 text-xl">
        <TableOfContents content={content} />

        <div className="py-16">
          <h1 className="text-start text-6xl/tight font-thin tracking-wide">
            {frontmatter.title}
          </h1>
          <div className="py-4 tracking-wide">
            <span className="rounded-lg bg-white px-2 py-1 text-black">
              {DateToString(frontmatter.start_date)}
            </span>
          </div>
          <div className="flex flex-row items-center gap-2 pt-2">
            {frontmatter.categories.map((category, index) => (
              <Badge key={index} variant="default" className="text-sm">
                {category}
              </Badge>
            ))}
          </div>
        </div>
        <MdxContent source={serialized} />
      </div>
    </div>
  );
}

import { MdxContent } from "@/components/mdx/mdx-content";
import { Badge } from "@/components/ui/badge";
import { GetPost } from "@/lib/api-utils/api-utils-post";
import { serialize } from "next-mdx-remote/serialize";
import Link from "next/link";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";
function GenerateHeaderID(text: string) {
  return text.toLowerCase().replace(/ /g, "-");
}
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await GetPost(slug);
  const { frontmatter, content } = post;
  const getHeadings = (content: string) => {
    const regex = /#{1,6}.*/g;
    const headings = content.match(regex);
    return headings?.map((heading) => {
      const text = heading.replace(/#/g, "").trim();
      const level = heading.match(/#/g)?.length || 0;
      const id = GenerateHeaderID(text);
      return { id, text, level };
    });
  };
  if (!frontmatter || !content) {
    return <div>Not found</div>;
  }
  const headings = getHeadings(content);
  const serialized = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeCodeTitles, rehypePrism as any]
    }
  });
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-slate-900">
      <ul className="fixed bottom-0 left-32 top-0 flex flex-col justify-center bg-primary/20 px-3">
        {headings?.map((heading, index) => (
          <li
            key={index}
            className={`hover: inline-flex gap-3 rounded-xl text-neutral-400 transition-all hover:text-primary/50`}
            style={{
              paddingLeft: `${heading.level - 1}rem`,
              fontSize: `${1.75 - heading.level * 0.2}rem`
            }}
          >
            <Link href={`#${heading.id}`}>{heading.text}</Link>
          </li>
        ))}
      </ul>
      <div className="container w-1/2 pt-16 text-xl">
        <div className="py-16">
          <h1 className="text-start text-6xl/tight font-thin tracking-wide">
            {frontmatter.title}
          </h1>
          <div className="py-4 tracking-wide">
            <span className="rounded-lg bg-white px-2 py-1 text-black">
              {String(frontmatter.start_date.getDate()).padStart(2, "0")}-
              {String(frontmatter.start_date.getMonth() + 1).padStart(2, "0")}-
              {frontmatter.start_date.getFullYear()}
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

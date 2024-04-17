import { MdxContent } from "@/components/mdx/mdx-content";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { GetPost } from "@/lib/api-utils/api-utils-post";
import { serialize } from "next-mdx-remote/serialize";
import rehypeCodeTitles from "rehype-code-titles";
import { renderToString } from 'react-dom/server';
import rehypePrism from "rehype-prism-plus";
import Link from "next/link";
export default async function Page({ params }: { params: { slug: string } }) {

  const { slug } = params;
  const post = await GetPost(slug);
  const { frontmatter, content } = post;
  const getHeadings = (content: string) => {
    const regex = /#{1,6}.*/g;
    const headings = content.match(regex);
    return headings?.map((heading) => {
      const text = heading.replace("#","").trim();
      const level = heading.match(/#/g)?.length || 0;
      return { text, level };
    });
  }
  const headings = getHeadings(content);
  const serialized = await serialize(content, {
    mdxOptions: {
      rehypePlugins: [rehypeCodeTitles, rehypePrism as any]
    }
  });

  return (
    <div className="grid grid-cols-6">
      <div className="bg-red-400 flex flex-col justify-center ps-8">
        <ul>
          {headings?.map((heading, index) => (
            <li key={index} className={`text-${4 - heading.level}xl`}>
              <Link href={`#${heading.text}`}>
                {heading.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="col-span-4 ps-16 container pt-32 text-xl">
        <h1 className="pb-5 text-5xl font-thin tracking-wide text-center">
          {frontmatter.title}
        </h1>
        <div className="flex flex-row gap-10 pb-5 justify-center">
          <div className="flex flex-col gap-3 items-center font-thin tracking-wide">
            <div>{`${frontmatter.date.getDate()}.${frontmatter.date.getMonth()}.${frontmatter.date.getFullYear()}`}</div>
            <div className="flex flex-row gap-2">
              {frontmatter.categories.map((category, index) => (
                <Badge key={index} variant="secondary" className="text-sm">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        <Separator orientation="horizontal" />
        <div className="pt-8">
          <MdxContent source={serialized} />
        </div>
      </div>
    </div>
  );
}

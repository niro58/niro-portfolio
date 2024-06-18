import { MdxComponents } from "@/components/mdx-components";
import { Badge } from "@/components/ui/badge";
import { GetPost } from "@/lib/api-utils/api-utils-post";
import { DateToString } from "@/lib/dateToString";
import { MDXRemote } from "next-mdx-remote/rsc";
import Head from "next/head";
export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await GetPost(slug);

  const { frontmatter, content } = post;
  if (!frontmatter || !content) {
    return <div>Not found</div>;
  }

  return (
    <>
      <Head>
        <title>{frontmatter.title}</title>
        <meta name="description" content={frontmatter.short_description} />
      </Head>
      <div className="min-h-screen bg-gradient-to-b from-background to-slate-900">
        <div className="container w-1/2 pt-16 text-xl">
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
          <MDXRemote source={content} components={MdxComponents} />
        </div>
      </div>
    </>
  );
}

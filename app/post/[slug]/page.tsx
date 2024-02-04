import { MdxContent } from "@/components/mdx-content";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { getPost } from "@/lib/posts";

export default async function Page({ params }: { params: { slug: string } }) {
  console.log(params.slug);
  const { serialized, frontmatter } = await getPost(
    "posts/" + params.slug + ".mdx"
  );
  const MarkdownComponent = () => {
    return (
      <div className="container pt-10 text-xl">
        <h1 className="text-5xl pb-5">{frontmatter.title}</h1>
        <div className="flex flex-row gap-10 p-5">
          <div className="flex flex-col gap-3 text-right text-gray-300">
            <div>Date</div>
            <div>Categories</div>
          </div>
          <div className="flex flex-col gap-3 ">
            <div>{`${frontmatter.date.getDate()}.${frontmatter.date.getMonth()}.${frontmatter.date.getFullYear()}`}</div>
            <div>
              {frontmatter.categories.map((category, index) => (
                <Badge key={index} variant={"outline"} className="text-sm">
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
    );
  };

  console.log(serialized, frontmatter);
  return frontmatter.title === "" ? <div></div> : <MarkdownComponent />;
}

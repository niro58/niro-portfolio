import { GetPosts, OutputPost } from "@/lib/api-utils/api-utils-post";
import { PortfolioPosts } from "./portfolio-client";

export async function Portfolio() {
  let data = [];
  const posts = await GetPosts();
  for (let project of posts) {
    data.push(project);
  }
  let gridData: OutputPost[][] = [[], [], []];
  for (let i = 0; i < data.length; i++) {
    gridData[i % 3].push(posts[i]);
  }

  return (
    <section className="flex w-full justify-center bg-gradient-to-b from-background to-primary/20 pt-12 md:pt-24 lg:pt-32">
      <div className="w-full py-24 sm:px-5 lg:w-10/12 lg:gap-5 lg:px-10">
        <div className="flex flex-col">
          <div className="justify-top mb-5 flex w-full flex-col items-start font-thin tracking-wide">
            <div className="text-start text-6xl/tight font-thin tracking-wide">
              Portfolio
            </div>
            <div className="text-start text-2xl/relaxed font-normal tracking-normal text-neutral-400">
              Still gotta write content for this section, for now just a list of
              projects I've worked on.
            </div>
          </div>

          <PortfolioPosts posts={gridData} />
        </div>
      </div>
    </section>
  );
}

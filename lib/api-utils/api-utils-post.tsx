import { Frontmatter, blank_frontmatter } from "../post-interfaces";

export async function GetPosts(): Promise<OutputPost[]> {
  const url = new URL("/api/posts", process.env.NEXT_ROOT_PATH);

  const res = await fetch(url.href, {
    method: "GET"
  });
  if (!res.ok) {
    return [];
  }
  const posts = await res.json();

  for (let post of posts) {
    post.frontmatter.start_date = new Date(post.frontmatter.start_date);
    post.frontmatter.end_date = new Date(post.frontmatter.end_date);
  }

  posts.sort((a: OutputPost, b: OutputPost) => {
    return (
      b.frontmatter.start_date.getTime() - a.frontmatter.start_date.getTime()
    );
  });
  return posts;
}
export interface OutputPost {
  slug?: string;
  frontmatter: Frontmatter;
  content?: string;
}
export async function GetPost(slug: string): Promise<OutputPost> {
  if (process.env.NEXT_ROOT_PATH === undefined)
    return { frontmatter: blank_frontmatter, content: "" };
  const url = new URL(`/api/posts/${slug}`, process.env.NEXT_ROOT_PATH);
  const res = await fetch(url, {
    method: "GET"
  });
  if (!res.ok) {
    return { frontmatter: blank_frontmatter, content: "" };
  }

  const post = await res.json();
  const { frontmatter, content } = post;
  if (frontmatter.start_date) {
    frontmatter.start_date = new Date(frontmatter.start_date);
  }
  if (frontmatter.end_date) {
    frontmatter.end_date = new Date(frontmatter.end_date);
  }

  return { frontmatter, content: content };
}

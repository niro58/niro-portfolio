"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

type MdxContentProps = {
  source: MDXRemoteSerializeResult;
};
const MdxComponents = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1
      className="mb-5 border-b-2 border-secondary py-2 text-4xl font-thin tracking-wide text-white"
      {...props}
    />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2
      className="mb-5 border-b-2 border-secondary py-2 text-3xl font-thin tracking-wide text-white"
      {...props}
    />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3
      className="mb-5 border-b-2 border-secondary py-2 text-2xl font-thin tracking-wide text-white"
      {...props}
    />
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h4
      className="mb-5 border-b-2 border-secondary py-2 text-xl font-thin tracking-wide text-white"
      {...props}
    />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="mb-5 list-disc" {...props} />
  ),
  li: (props: React.HTMLProps<HTMLLIElement>) => <li {...props} />,
  /** Card component */
  Card: (props: React.HTMLProps<HTMLDivElement>) => (
    <div
      style={{
        background: "#333",
        borderRadius: "0.25rem",
        padding: "0.5rem 1rem"
      }}
      {...props}
    />
  ),

  Image: (props: React.HTMLProps<HTMLImageElement>) => (
    <img
      style={{
        borderRadius: "0.25rem",
        padding: "0.5rem 1rem"
      }}
      {...props}
    />
  )
};

export function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote {...source} components={MdxComponents} />;
}

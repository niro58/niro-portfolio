"use client";

import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";

type MdxContentProps = {
  source: MDXRemoteSerializeResult;
};
const MdxComponents = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1
      className="text-4xl text-primary mb-5 py-2 border-b-2 border-primary"
      {...props}
    />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2
      className="text-3xl text-primary mb-5 py-2 border-b-2 border-primary"
      {...props}
    />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3
      className="text-2xl text-primary mb-5 py-2 border-b-2 border-primary"
      {...props}
    />
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h4
      className="text-xl text-primary mb-5 py-2 border-b-2 border-primary"
      {...props}
    />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="list-disc mb-5" {...props} />
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
  Code: (props: React.HTMLProps<HTMLDivElement>) => (
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

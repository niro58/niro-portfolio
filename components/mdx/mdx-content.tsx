"use client";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import Image, { ImageProps } from "next/image";
import { ReactNode, useState } from "react";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";
import { Button } from "../ui/button";

type MdxContentProps = {
  source: MDXRemoteSerializeResult;
};
function CopyButton({ children }: { children: ReactNode }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      size="icon"
      className="absolute right-2 top-2 rounded-lg bg-primary/50 transition-all hover:bg-primary/100"
      onClick={() => {
        navigator.clipboard.writeText(children as string);
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 1000);
      }}
    >
      {copied ? <FaRegCircleCheck /> : <MdContentCopy />}
    </Button>
  );
}
export function GenerateHeaderID(text: string) {
  return text.toLowerCase().replace(/ /g, "-");
}
const MdxComponents = {
  h1: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h1
      className="mb-5 border-b-2 border-secondary py-2 text-4xl font-thin tracking-wide text-white"
      id={GenerateHeaderID(props.children as string)}
      {...props}
    />
  ),
  h2: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h2
      className="mb-5 border-b-2 border-secondary py-2 text-3xl font-thin tracking-wide text-white"
      id={GenerateHeaderID(props.children as string)}
      {...props}
    />
  ),
  h3: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h3
      className="mb-5 border-b-2 border-secondary py-2 text-2xl font-thin tracking-wide text-white"
      id={GenerateHeaderID(props.children as string)}
      {...props}
    />
  ),
  h4: (props: React.HTMLProps<HTMLHeadingElement>) => (
    <h4
      className="mb-5 border-b-2 border-secondary py-2 text-xl font-thin tracking-wide text-white"
      id={GenerateHeaderID(props.children as string)}
      {...props}
    />
  ),
  ul: (props: React.HTMLProps<HTMLUListElement>) => (
    <ul className="mb-5 list-disc" {...props} />
  ),
  li: (props: React.HTMLProps<HTMLLIElement>) => <li {...props} />,
  pre: (props: React.HTMLProps<HTMLPreElement>) => (
    <pre className="relative rounded-lg border bg-background/50 p-5">
      {props.children}
      <CopyButton>{props.children}</CopyButton>
    </pre>
  ),
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

  Image: (props: React.HTMLProps<HTMLImageElement>) => {
    const { alt = "", ...otherProps } = props as ImageProps;
    return (
      <Image
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
        alt={alt}
        {...otherProps}
      />
    );
  }
};

export function MdxContent({ source }: MdxContentProps) {
  return <MDXRemote {...source} components={MdxComponents} />;
}

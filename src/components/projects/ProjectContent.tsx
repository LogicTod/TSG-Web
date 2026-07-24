import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import { urlForImage } from "@/sanity/image";

interface ProjectContentProps {
  content: unknown[];
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-5 text-base leading-relaxed text-slate-300">{children}</p>
    ),
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 font-display text-2xl font-bold text-white">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-display text-xl font-semibold text-white">
        {children}
      </h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-accent pl-4 text-base italic text-slate-400">
        {children}
      </blockquote>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline underline-offset-2 hover:text-primary"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-white">{children}</strong>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 ml-5 list-disc space-y-2 text-slate-300">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 ml-5 list-decimal space-y-2 text-slate-300">{children}</ol>
    ),
  },
  types: {
    image: ({ value }) => (
      <div className="relative my-8 aspect-video w-full overflow-hidden rounded-2xl border border-white/[0.08]">
        <Image
          src={urlForImage(value).width(1000).auto("format").url()}
          alt={value?.alt ?? ""}
          fill
          className="object-cover"
        />
      </div>
    ),
  },
};

export function ProjectContent({ content }: ProjectContentProps) {
  return (
    <div className="mx-auto max-w-2xl">
      <PortableText value={content as never} components={components} />
    </div>
  );
}

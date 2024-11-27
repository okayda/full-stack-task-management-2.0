import Link from "next/link";
import { ExternalLinkIcon } from "lucide-react";

const techStack = [
  { name: "Next.js v14.2.16", link: "https://nextjs.org/" },
  { name: "TypeScript", link: "https://www.typescriptlang.org/" },
  { name: "TailwindCSS", link: "https://tailwindcss.com/" },
  { name: "Appwrite", link: "https://appwrite.io/" },
  { name: "Hono.js", link: "https://hono.dev/" },
  { name: "TanStack Query", link: "https://tanstack.com/query" },
];

export default function TechStack() {
  return (
    <div className="grid grid-cols-3 gap-4 pb-6 pt-4">
      {techStack.map((tech, index) => (
        <Link
          key={index}
          href={tech.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-lg border bg-background/40 p-4 text-center text-base backdrop-blur-md transition-colors duration-300 hover:border-neutral-300 hover:bg-neutral-50"
        >
          {tech.name}

          <ExternalLinkIcon className="size-5 text-sky-600" />
        </Link>
      ))}
    </div>
  );
}

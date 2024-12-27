import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import GridPattern from "@/components/ui/grid-pattern";
import TechStack from "./tech-stack";

import { Github, BadgeCheckIcon } from "lucide-react";

export const MobileDisclaimer = function () {
  return (
    <div className="sm:relative">
      <div className="relative mx-auto max-w-[25rem] py-6 sm:static sm:max-w-[25.625rem] md:mx-0 md:max-w-none md:flex-grow md:py-11 lg-l:hidden">
        <GridPattern
          squares={[
            [7, 1],
            [1, 9],
            [0, 5],
            [3, 6],
            [2, 3],
            [6, 8],
            [9, 4],
            [10, 10],
            [4, 11],
            [2, 13],
            [7, 12],
            [8, 12],
          ]}
          className={cn(
            "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 skew-y-0",
          )}
        />
        <h4 className="mb-3 text-[1.625rem] font-semibold md:text-[2rem]">
          Disclaimer
        </h4>

        <p className="mb-4 text-muted-foreground">
          For the sake of transparency, I want to clarify that I don&apos;t
          collect or misuse any personal information. You can review the
          authentication functionality{" "}
          <Link href="#" className="text-sky-500">
            here
          </Link>{" "}
          to see how I handle it. All data stored in the database will be{" "}
          <span className="text-emerald-500">
            automatically deleted after 15 days
          </span>
          .
        </p>

        <p className="mb-4 text-muted-foreground">
          Any design similarities between this project and your project are{" "}
          <span className="text-emerald-500">purely coincidental</span>. I
          created this project solely for my own educational purposes. Thank
          you.
        </p>

        <p className="text-muted-foreground">
          Sincerely,{" "}
          <span className="text-emerald-400"> Jhon Que&ntilde;ano</span>
        </p>
      </div>
    </div>
  );
};

export const DesktopDisclaimer = function ({
  removeGithub,
}: {
  removeGithub?: boolean;
}) {
  return (
    <div className="w-full">
      <div className="relative hidden h-[20rem] self-start rounded-lg lg-l:block">
        <BadgeCheckIcon
          className="absolute right-0 top-0 z-10 m-3 size-10 text-green-400"
          strokeWidth="1.5px"
        />
        <Image
          src="/auth-background.webp"
          className="h-full w-full rounded-lg object-cover"
          alt="Authentication Background"
          priority
          width={700}
          height={760}
        />

        <div className="absolute inset-0 rounded-lg bg-black opacity-75" />

        <div className="absolute inset-0 px-10 pt-9">
          <div className="text-left text-white">
            <h2
              className="mb-3 text-[2rem] font-semibold tracking-wide"
              style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.45)" }}
            >
              Disclaimer
            </h2>

            <p
              className="mb-5"
              style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.45)" }}
            >
              For the sake of transparency, I want to clarify that I don&apos;t
              collect or misuse any personal information. You can review the
              authentication functionality{" "}
              <Link href="#" className="text-sky-400">
                here
              </Link>{" "}
              to see how I handle it. All data stored in the database will be{" "}
              <span className="text-emerald-400">
                automatically deleted after 15 days
              </span>
              .
            </p>

            <p
              className="mb-5"
              style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.45)" }}
            >
              Any design similarities between this project and your project are{" "}
              <span className="text-emerald-400">purely coincidental</span>. I
              created this project solely for my own educational purposes. Thank
              you.
            </p>

            <p>
              Sincerely,{" "}
              <span className="text-emerald-400"> Jhon Que&ntilde;ano</span>
            </p>
          </div>
        </div>
      </div>

      <div className="hidden lg-l:block">
        {removeGithub || (
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/okayda/full-stack-task-management-2.0"
            className="mt-6 flex items-center justify-between rounded-lg border bg-background/40 p-4 backdrop-blur-md transition-colors hover:border-purple-400"
          >
            <h4 className="text-xl font-medium">Task Management v2.0</h4>

            <Github className="size-7" />
          </Link>
        )}

        <div className={cn({ "mt-3": removeGithub })}>
          <TechStack />
        </div>
      </div>
    </div>
  );
};

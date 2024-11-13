"use client";

import { useForm } from "react-hook-form";

import Image from "next/image";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreate } from "../api/use-create";
import { createUserSchema } from "@/features/auth/schemas";

import { cn } from "@/lib/utils";

import { Separator } from "@/components/ui/separator";
import GridPattern from "@/components/ui/grid-pattern";
import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardDescription,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FaGithub, FaGoogle } from "react-icons/fa";
import { BadgeCheckIcon } from "lucide-react";

export default function SignUpCard() {
  const { mutate: createAccount, isPending: isCreatingAccount } = useCreate();

  const form = useForm<z.infer<typeof createUserSchema>>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = function (values: z.infer<typeof createUserSchema>) {
    createAccount(
      { json: values },
      {
        onError: function (error) {
          form.setError("root.serverError", {
            type: "server",
            message: error.message,
          });
        },
      },
    );
  };

  return (
    <div className="md:mx-auto md:flex md:max-w-[900px] md:gap-x-6 md-l:gap-x-12 lg-l:block lg-l:max-w-none">
      <div className="md:w-[400px] md:shrink-0 lg-l:w-auto lg-l:shrink">
        <Card className="mx-auto max-w-[400px] rounded-none border-x-0 border-b border-t-0 border-dashed border-muted-foreground shadow-none sm:max-w-[410px] sm:border-none lg-l:mx-0 lg-l:flex lg-l:w-full lg-l:max-w-none lg-l:gap-x-6 lg-l:bg-transparent">
          <div className="sm:rounded-lg sm:border sm:bg-background sm:shadow-sm lg-l:w-full lg-l:max-w-[410px]">
            <CardHeader className="px-0 pt-9 sm:px-6">
              <CardTitle className="mb-1 text-[32px]">Create account</CardTitle>

              <CardDescription className="text-base">
                Join us and start organizing your tasks effortlessly. Together,
                we&apos;ll keep you on track.
              </CardDescription>
            </CardHeader>

            <CardContent className="justify-cente flex gap-x-4 px-0 pb-6 sm:px-6">
              <Button
                onClick={() => {}}
                disabled={isCreatingAccount}
                variant="outline"
                className="w-full border-neutral-700/20 p-3"
                size="lg"
              >
                <FaGithub />
                <span className="font-semibold tracking-wide">Github</span>
              </Button>

              <Button
                onClick={() => {}}
                disabled={isCreatingAccount}
                variant="outline"
                className="w-full border-neutral-700/20 p-3"
                size="lg"
              >
                <FaGoogle />
                <span className="font-semibold tracking-wide">Google</span>
              </Button>
            </CardContent>

            <CardContent className="grid gap-y-4 px-0 pb-0 sm:px-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted-foreground" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    or
                  </span>
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 pt-2"
                >
                  <FormField
                    name="username"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold tracking-wide text-foreground">
                          Username
                        </FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="off"
                            type="username"
                            placeholder="linus_torvalds"
                            {...field}
                            className="!mt-1 h-[45px] border-neutral-400/60 text-[15px]"
                          />
                        </FormControl>

                        <FormMessage className="!mt-[5.5px]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold tracking-wide text-foreground">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input
                            autoComplete="off"
                            type="email"
                            placeholder="hello_world@navercorp.com"
                            {...field}
                            className="!mt-1 h-[45px] border-neutral-400/60 text-[15px]"
                          />
                        </FormControl>

                        <FormMessage className="!mt-[5.5px]" />
                      </FormItem>
                    )}
                  />

                  {form.formState.errors.root?.serverError && (
                    <p className="!mt-[5.5px] text-[12.8px] text-rose-500">
                      {form.formState.errors.root.serverError.message}
                    </p>
                  )}

                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold tracking-wide text-foreground">
                          Password
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password (at least 8 characters)"
                            {...field}
                            className="!mt-1 h-[45px] border-neutral-400/60 text-[15px]"
                          />
                        </FormControl>

                        <FormMessage className="!mt-[5.5px]" />
                      </FormItem>
                    )}
                  />

                  <Button
                    disabled={isCreatingAccount}
                    size="lg"
                    className="h-[42px] w-full font-semibold tracking-wide"
                  >
                    {isCreatingAccount ? "Loading..." : "Create"}
                  </Button>
                </form>
              </Form>
            </CardContent>

            <CardFooter className="my-3 flex items-center justify-center py-4 sm:my-5 sm:bg-secondary">
              <p className="text-sm font-semibold">
                Already have an account?
                <Link href="/sign-in">
                  <span className="text-sky-600"> Sign In</span>
                </Link>
              </p>
            </CardFooter>
          </div>

          <div className="relative hidden h-[320px] w-full self-start rounded-lg lg-l:block">
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
                  className="mb-6 text-[32px] font-semibold tracking-wide"
                  style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.75)" }}
                >
                  Disclaimer
                </h2>

                <p
                  className="mb-5"
                  style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.75)" }}
                >
                  For the sake of transparency, I want to clarify that I
                  don&apos;t collect or misuse any personal information. You can
                  review the authentication functionality{" "}
                  <Link href="#" className="text-sky-400">
                    here
                  </Link>{" "}
                  to see how I handle it. All data stored in the database will
                  be{" "}
                  <span className="text-emerald-400">
                    automatically deleted after 15 days
                  </span>
                  .
                </p>

                <p
                  className="mb-5"
                  style={{ textShadow: "1px 1px 3px rgba(0, 0, 0, 0.75)" }}
                >
                  Any design similarities between this project and your project
                  are{" "}
                  <span className="text-emerald-400">purely coincidental</span>.
                  I created this project solely for my own educational purposes.
                  Thank you.
                </p>

                <p>
                  Sincerely,{" "}
                  <span className="text-emerald-400"> Jhon Que&ntilde;ano</span>
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Separator className="mt-6 hidden py-2 sm:block md:hidden" />

      <div className="sm:relative">
        <div className="relative mx-auto max-w-[400px] py-11 sm:static sm:max-w-[410px] md:mx-0 md:max-w-none md:flex-grow lg-l:hidden">
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
          <h4 className="mb-3 text-[26px] font-semibold">Disclaimer</h4>

          <p className="mb-4">
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

          <p className="mb-4">
            Any design similarities between this project and your project are{" "}
            <span className="text-emerald-500">purely coincidental</span>. I
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
  );
}

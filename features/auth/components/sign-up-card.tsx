"use client";

import React from "react";
import { useForm } from "react-hook-form";

import Image from "next/image";
import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { createSchema } from "@/features/auth/schemas";

import { AuroraBackground } from "@/components/ui/aurora-background";

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
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<z.infer<typeof createSchema>>({
    resolver: zodResolver(createSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async function (data: z.infer<typeof createSchema>) {
    setIsSubmitting(true);
    try {
      // Replace this with your actual login
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Registered successful:", data);
    } catch (e) {
      console.error("Register error:", e);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <React.Fragment>
      <AuroraBackground className="absolute left-0 top-0 -z-10 hidden h-screen w-screen lg-l:block">
        &nbsp;
      </AuroraBackground>
      <div className="mx-auto max-w-[1200px]">
        <Card className="mx-auto max-w-[400px] rounded-none border-none shadow-none lg-l:mx-0 lg-l:flex lg-l:w-full lg-l:max-w-none lg-l:gap-x-4 lg-l:bg-transparent">
          <div className="lg-l:w-full lg-l:max-w-[410px] lg-l:rounded-lg lg-l:border lg-l:bg-background lg-l:shadow-sm">
            <CardHeader className="pt-9">
              <CardTitle className="mb-1 text-3xl">Create account</CardTitle>

              <CardDescription className="text-base">
                Join us and start organizing your tasks effortlessly. Together,
                we&apos;ll keep you on track and moving forward.
              </CardDescription>
            </CardHeader>

            <CardContent className="justify-cente flex gap-x-4 pb-6">
              <Button
                onClick={() => {}}
                disabled={isSubmitting}
                variant="outline"
                className="w-full border-neutral-700/20 p-3"
                size="lg"
              >
                <FaGithub />
                <span className="font-semibold tracking-wide">Github</span>
              </Button>

              <Button
                onClick={() => {}}
                disabled={isSubmitting}
                variant="outline"
                className="w-full border-neutral-700/20 p-3"
                size="lg"
              >
                <FaGoogle />
                <span className="font-semibold tracking-wide">Google</span>
              </Button>
            </CardContent>

            <CardContent className="grid gap-y-4 pb-0">
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
                            className="!mt-1 h-[40px] border-neutral-400/60"
                          />
                        </FormControl>

                        <FormMessage className="!mt-1" />
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
                            className="!mt-1 h-[40px] border-neutral-400/60"
                          />
                        </FormControl>

                        <FormMessage className="!mt-1" />
                      </FormItem>
                    )}
                  />

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
                            placeholder="Password (at least 6 characters)"
                            {...field}
                            className="!mt-1 h-[40px] border-neutral-400/60"
                          />
                        </FormControl>

                        <FormMessage className="!mt-1" />
                      </FormItem>
                    )}
                  />

                  <Button
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full font-semibold tracking-wide"
                  >
                    {isSubmitting ? "Loading..." : "Create"}
                  </Button>
                </form>
              </Form>
            </CardContent>

            <CardFooter className="flex items-center justify-center p-7">
              <p>
                Don&apos;t have an account?
                <Link href="/sign-up">
                  <span className="text-blue-700"> Sign Up</span>
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
                  className="mb-6 text-4xl font-bold tracking-wide"
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
    </React.Fragment>
  );
}

"use client";

import { useForm } from "react-hook-form";

import Link from "next/link";

import { signUpWithGoogle, signUpWithGithub } from "@/lib/oauth";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreate } from "../api/use-create";
import { createUserSchema } from "@/features/auth/schemas";

import { Separator } from "@/components/ui/separator";
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
import RippleButton from "@/components/ui/ripple-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { FaGithub, FaGoogle } from "react-icons/fa";

import { LoaderIcon } from "lucide-react";
import { DesktopDisclaimer, MobileDisclaimer } from "./disclaimer";

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
    <div className="md:mx-auto md:flex md:max-w-[56.25rem] md:gap-x-6 md-l:gap-x-12 lg-l:block lg-l:max-w-none">
      <div className="md:w-[25rem] md:shrink-0 lg-l:w-auto lg-l:shrink">
        <Card className="mx-auto max-w-[25rem] rounded-none border-x-0 border-b border-t-0 border-dashed border-muted-foreground shadow-none sm:max-w-[25.625rem] sm:border-none lg-l:mx-0 lg-l:flex lg-l:w-full lg-l:max-w-none lg-l:gap-x-6 lg-l:bg-transparent">
          <div className="sm:rounded-lg sm:border sm:bg-background sm:shadow-sm lg-l:w-full lg-l:max-w-[25.625rem]">
            <CardHeader className="px-0 pt-9 sm:px-6">
              <CardTitle className="mb-1 text-[2rem]">Create account</CardTitle>

              <CardDescription className="text-base">
                Join us and start organizing your tasks effortlessly. Together,
                we&apos;ll keep you on track.
              </CardDescription>
            </CardHeader>

            <CardContent className="justify-cente flex gap-x-4 px-0 pb-6 sm:px-6">
              <Button
                onClick={() => signUpWithGithub()}
                disabled={isCreatingAccount}
                variant="outline"
                className="h-[2.6875rem] w-full border-neutral-700/20 p-3"
                size="lg"
              >
                <FaGithub />

                <span className="self-end font-semibold leading-none tracking-wide">
                  Github
                </span>
              </Button>

              <Button
                onClick={() => signUpWithGoogle()}
                disabled={isCreatingAccount}
                variant="outline"
                className="h-[2.6875rem] w-full border-neutral-700/20 p-3"
                size="lg"
              >
                <FaGoogle />

                <span className="self-end font-semibold leading-none tracking-wide">
                  Google
                </span>
              </Button>
            </CardContent>

            <CardContent className="grid gap-y-4 px-0 pb-0 sm:px-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted-foreground/30" />
                </div>

                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground/70">
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
                        <FormLabel className="tracking-wide">
                          Username
                        </FormLabel>

                        <FormControl>
                          <Input
                            autoComplete="off"
                            type="username"
                            placeholder="linus_torvalds"
                            {...field}
                            className="!mt-1 h-[2.8125rem] border-neutral-400/60 text-[0.9375rem]"
                          />
                        </FormControl>

                        <FormMessage className="!mt-[0.34375rem]" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center justify-between tracking-wide">
                          Email
                          <span className="text-xs text-muted-foreground/70">
                            (Don&apos;t use your real email)
                          </span>
                        </FormLabel>

                        <FormControl>
                          <Input
                            autoComplete="off"
                            type="email"
                            placeholder="hello_world@navercorp.com"
                            {...field}
                            className="h-[2.8125rem] border-neutral-400/60 text-[0.9375rem]"
                          />
                        </FormControl>

                        <FormMessage className="!mt-[0.34375rem]" />
                      </FormItem>
                    )}
                  />

                  {form.formState.errors.root?.serverError && (
                    <p className="!mt-[0.34375rem] text-[0.8rem] text-rose-500">
                      {form.formState.errors.root.serverError.message}
                    </p>
                  )}

                  <FormField
                    name="password"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="tracking-wide">
                          Password
                        </FormLabel>

                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Password (at least 8 characters)"
                            {...field}
                            className="!mt-1 h-[2.8125rem] border-neutral-400/60 text-[0.9375rem]"
                          />
                        </FormControl>

                        <FormMessage className="!mt-[0.34375rem]" />
                      </FormItem>
                    )}
                  />

                  <RippleButton
                    disabled={isCreatingAccount}
                    rippleColor="#059669"
                    className="h-[2.625rem] w-full text-sm font-medium tracking-wide"
                  >
                    {isCreatingAccount ? (
                      <span className="flex items-center gap-x-2">
                        Creating
                        <LoaderIcon className="!size-5 animate-spin" />
                      </span>
                    ) : (
                      "Create"
                    )}
                  </RippleButton>
                </form>
              </Form>
            </CardContent>

            <CardFooter className="my-3 flex items-center justify-center py-4 sm:my-5 sm:border-y sm:bg-[#FAFAFA]">
              <p className="text-sm font-medium">
                Already have an account?
                <Link href="/sign-in">
                  <span className="text-sky-600"> Sign In</span>
                </Link>
              </p>
            </CardFooter>
          </div>

          <DesktopDisclaimer />
        </Card>
      </div>

      <Separator className="mt-6 hidden py-2 sm:block md:hidden" />

      <MobileDisclaimer />
    </div>
  );
}

"use client";

import { useForm } from "react-hook-form";

import Link from "next/link";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLogin } from "../api/use-login";

import { loginUserSchema } from "@/features/auth/schemas";

import { DesktopDisclaimer, MobileDisclaimer } from "./disclaimer";
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
import { Input } from "@/components/ui/input";

import { LoaderIcon } from "lucide-react";

export default function SignInCard() {
  const { mutate: verifyAccount, isPending: isVerifyingAccount } = useLogin();

  const form = useForm<z.infer<typeof loginUserSchema>>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = function (formValues: z.infer<typeof loginUserSchema>) {
    verifyAccount({ json: formValues });
  };

  return (
    <div className="md:mx-auto md:flex md:max-w-[56.25rem] md:gap-x-6 md-l:gap-x-12 lg-l:block lg-l:max-w-none">
      <div className="md:w-[25rem] md:shrink-0 lg-l:w-auto lg-l:shrink">
        <Card className="mx-auto max-w-[25rem] rounded-none border-x-0 border-b border-t-0 border-dashed border-muted-foreground shadow-none sm:max-w-[25.625rem] sm:border-none sm:bg-transparent lg-l:mx-0 lg-l:flex lg-l:w-full lg-l:max-w-none lg-l:items-start lg-l:gap-x-6">
          <div className="sm:rounded-lg sm:border sm:bg-background sm:shadow-sm lg-l:w-full lg-l:max-w-[25.625rem]">
            <CardHeader className="px-0 pt-9 sm:px-6">
              <CardTitle className="mb-1 text-[2rem]">Get started</CardTitle>

              <CardDescription className="font-geist text-base">
                Log in to stay organized and keep your tasks on track.
                Let&apos;s get things done together.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-y-4 px-0 pb-0 sm:px-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-muted-foreground/30" />
                </div>

                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground/70">
                    begin your path
                  </span>
                </div>
              </div>

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 pt-2"
                >
                  <FormField
                    name="email"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="tracking-wide">Email</FormLabel>

                        <FormControl>
                          <Input
                            autoComplete="off"
                            type="email"
                            placeholder="hello_world@navercorp.com"
                            {...field}
                            className="!mt-1 h-[2.8125rem] border-neutral-400/60 text-[0.9375rem]"
                          />
                        </FormControl>

                        <FormMessage className="!mt-[0.34375rem]" />
                      </FormItem>
                    )}
                  />

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
                            placeholder="Enter your password"
                            {...field}
                            className="!mt-1 h-[2.8125rem] border-neutral-400/60 text-[0.9375rem]"
                          />
                        </FormControl>

                        <FormMessage className="!mt-[0.34375rem]" />
                      </FormItem>
                    )}
                  />

                  <RippleButton
                    disabled={isVerifyingAccount}
                    rippleColor="#059669"
                    className="h-[2.625rem] w-full text-sm font-medium tracking-wide"
                  >
                    {isVerifyingAccount ? (
                      <span className="flex items-center gap-x-2">
                        Verifying
                        <LoaderIcon className="!size-5 animate-spin" />
                      </span>
                    ) : (
                      "Login"
                    )}
                  </RippleButton>
                </form>
              </Form>
            </CardContent>

            <CardFooter className="my-3 flex items-center justify-center py-4 sm:my-5 sm:border-y sm:bg-[#FAFAFA]">
              <p className="text-sm font-medium">
                Don&apos;t have an account?
                <Link href="/sign-up">
                  <span className="text-sky-600"> Sign Up</span>
                </Link>
              </p>
            </CardFooter>
          </div>

          <DesktopDisclaimer removeGithub={true} />
        </Card>
      </div>

      <Separator className="mt-6 hidden py-2 sm:block md:hidden" />

      <MobileDisclaimer />
    </div>
  );
}

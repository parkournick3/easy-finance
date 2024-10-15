"use client";

import { signIn } from "@/api/authenticate";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { useToast } from "@repo/ui/hooks/use-toast";
import { SignInInput, signInSchema } from "@repo/validations-and-types";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function SignIn() {
  const t = useTranslations();
  const { toast } = useToast();
  const form = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = useMutation({
    mutationFn: signIn,
    onSuccess: () => {
      toast({
        description: t("sign_in.success"),
      });
    },
    onError: () => {
      toast({
        description: t("common.error"),
      });
    },
  });

  return (
    <div className="container pt-10 space-y-4">
      <h1>Easy Finance</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => onSubmit.mutate(data))}
          className="space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("sign_in.email.placeholder")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("sign_in.email.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("sign_in.password.placeholder")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("sign_in.password.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{t("sign_in.submit")}</Button>
        </form>
      </Form>

      <Link href="sign-up">
        <Button variant="link">{t("sign_in.no_account")}</Button>
      </Link>
    </div>
  );
}

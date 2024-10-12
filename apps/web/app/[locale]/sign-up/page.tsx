"use client";

import { createUser } from "@/api/create-user";
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
import { CreateUserInput, createUserSchema } from "@repo/validations-and-types";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { useForm } from "react-hook-form";

export default function Home() {
  const t = useTranslations();
  const { toast } = useToast();
  const form = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      currency: "BRL",
      email: "",
      firstName: "",
      lastName: "",
      password: "",
    },
  });

  const onSubmit = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      toast({
        description: t("sign_up.success"),
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
                <FormLabel>{t("sign_up.email.placeholder")}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t("sign_up.email.placeholder")}
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
                <FormLabel>{t("sign_up.password.placeholder")}</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("sign_up.password.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("sign_up.first_name.placeholder")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("sign_up.first_name.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("sign_up.last_name.placeholder")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("sign_up.last_name.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currency"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("sign_up.currency.placeholder")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("sign_up.currency.placeholder")}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">{t("sign_up.submit")}</Button>
        </form>
      </Form>

      <Link href="sign-in">
        <Button variant="link">{t("sign_up.has_account")}</Button>
      </Link>
    </div>
  );
}

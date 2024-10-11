import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function SignIn() {
  const t = useTranslations();

  return (
    <div className="container pt-10 space-y-4">
      <h1>Easy Finance</h1>

      <Input type="email" placeholder={t("sign_in.email.placeholder")} />
      <Input type="password" placeholder={t("sign_in.password.placeholder")} />

      <Button>{t("sign_in.submit")}</Button>
      <Link href="sign-up">
        <Button variant="link">{t("sign_in.no_account")}</Button>
      </Link>
    </div>
  );
}

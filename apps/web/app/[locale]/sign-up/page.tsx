import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="container pt-10 space-y-4">
      <h1>Easy Finance</h1>

      <Input type="email" placeholder={t("sign_in.email.placeholder")} />
      <Input type="password" placeholder={t("sign_in.password.placeholder")} />
      <Input type="text" placeholder={t("sign_in.first_name.placeholder")} />
      <Input type="text" placeholder={t("sign_in.last_name.placeholder")} />
      <Input type="text" placeholder={t("sign_in.currency.placeholder")} />

      <Button>{t("sign_up.submit")}</Button>
      <Link href="sign-in">
        <Button variant="link">{t("sign_up.has_account")}</Button>
      </Link>
    </div>
  );
}

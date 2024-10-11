import { Button } from "@repo/ui/components/ui/button";
import { Input } from "@repo/ui/components/ui/input";
import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="container pt-10 space-y-4">
      <h1>Easy Finance</h1>
      <Button>{t("hello")}</Button>

      <Input type="email" placeholder="Email" />
    </div>
  );
}

import { useTranslations } from "next-intl";

export default function Home() {
  const t = useTranslations();

  return (
    <div className="container">
      Easy Finance
      {t("hello")}
    </div>
  );
}

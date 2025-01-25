import { CreateElevatorForm } from "../components/biz/elevator/create";
import { useTranslations } from "next-intl";
export default function Home() {
  const t = useTranslations("Home");
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <CreateElevatorForm />
      </main>
    </div>
  );
}

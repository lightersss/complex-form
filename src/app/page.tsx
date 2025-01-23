import { CreateElevatorForm } from "../components/biz/elevator/create";

export const revalidate = 4; // invalidate every hour
export default async function Home() {
  const res: number[] = await new Promise((resolve) =>
    setTimeout(() => {
      resolve([1, 2, 3]);
    }, 2000)
  );
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <CreateElevatorForm res={res} />
      </main>
    </div>
  );
}

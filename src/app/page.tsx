import { getAbout } from "@/sanity";

export default async function Home() {
    const about = await getAbout();
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return (
        <div
            className="font-sans grid grid-rows-[20px_1fr_20px] n justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
                {about?.plainText || "No about description found."}
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
                Bhavya Jain | 2026
            </footer>
        </div>
    );
}

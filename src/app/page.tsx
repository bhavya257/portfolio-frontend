import { TileShowcase } from "@/components/ui/TileShowcase";
import { getAbout } from "@/sanity";

export default async function Home() {
    const about = await getAbout();
    return (
        <div className="font-sans grid grid-rows-[20px_1fr_20px] justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-[var(--color-black)] text-[var(--color-white)]">
            <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start max-w-xl">
                <TileShowcase />
                <p>{about?.plainText || "No about description found."}</p>
            </main>
            <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center text-sm opacity-60">
                Bhavya Jain | 2026
            </footer>
        </div>
    );
}

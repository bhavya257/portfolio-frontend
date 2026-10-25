import { TileShowcase } from "@/components/ui/TileShowcase";
import { getAbout } from "@/sanity";

export default async function Home() {
    const about = await getAbout();
    return (
        <div className="font-sans flex flex-col items-center justify-center p-8 sm:p-20 gap-12 max-w-xl mx-auto">
            <TileShowcase />
            <p className="text-zinc-300 leading-relaxed text-center sm:text-left">
                {about?.plainText || "Software developer driven by curiosity and first principles, solving complex problems across diverse domains."}
            </p>
            <footer className="text-sm opacity-60 text-center">
                Bhavya Jain | 2026
            </footer>
        </div>
    );
}

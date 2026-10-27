import { siteConfig } from "@/lib/site";

export function Footer() {
  const currentYear = siteConfig.copyrightYear ?? new Date().getFullYear();

  return (
    <footer className="text-center w-full py-6 text-white/50">
      <small>
        Copyright &copy; <span suppressHydrationWarning>{currentYear}</span>. {siteConfig.name}. All Rights Reserved.
      </small>
    </footer>
  );
}

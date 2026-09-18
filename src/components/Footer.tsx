import { footer, navigation } from "@/content/site";

export function Footer() {
  return (
    <footer className="page-wrap border-t border-rule py-6">
      <div className="flex flex-wrap items-center justify-between gap-3 type-marker">
        <span>{footer.copyright}</span>
        <span>{footer.closing}</span>
        <a
          href="#top"
          className="text-text-secondary no-underline transition-colors duration-200 hover:text-orange"
        >
          {navigation.backToTop}
        </a>
      </div>
    </footer>
  );
}

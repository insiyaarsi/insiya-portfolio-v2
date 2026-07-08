import { Github, Linkedin, Mail, FileText } from "lucide-react";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} insiya arsiwala · built by hand</span>
        <div className="flex flex-wrap items-center gap-4">
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
            <Mail className="h-3 w-3" /> email
          </a>
          <a href={site.github} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <Github className="h-3 w-3" /> github
          </a>
          <a href={site.linkedin} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 hover:text-foreground">
            <Linkedin className="h-3 w-3" /> linkedin
          </a>
          <a href={site.resume} target="_blank" rel="noreferrer noopener" className="inline-flex items-center gap-1.5 text-brand hover:opacity-80">
            <FileText className="h-3 w-3" /> résumé
          </a>
        </div>
      </div>
    </footer>
  );
}

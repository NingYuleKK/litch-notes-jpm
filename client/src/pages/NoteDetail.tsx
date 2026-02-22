import { useRoute, Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import { getNoteById } from "@/data/notes";
import { Streamdown } from "streamdown";
import NotFound from "./NotFound";
import GiscusComments from "@/components/GiscusComments";

export default function NoteDetail() {
  const [match, params] = useRoute("/note/:id");

  if (!match) {
    return <NotFound />;
  }

  const note = getNoteById(params!.id);

  if (!note) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header with back button */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft size={20} />
              <span>返回首页</span>
            </a>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8 md:py-12">
        <article className="max-w-3xl mx-auto">
          {/* Title and Meta */}
          <header className="mb-8 pb-8 border-b border-border">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4">
              {note.title}
            </h1>

            <div className="flex flex-col gap-4 text-sm text-muted-foreground">
              <div className="flex flex-wrap items-center gap-4">
                <span>📅 {note.created}</span>
                <span>📌 {note.category}</span>
                <span>🔗 {note.source.join(", ")}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose-note">
            <Streamdown>{note.content}</Streamdown>
          </div>

          {/* Giscus Comments */}
          <GiscusComments />

          {/* Footer */}
          <footer className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                <p>笔记创建于 {note.created}</p>
              </div>
              <Link href="/">
                <a className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                  <ArrowLeft size={18} />
                  <span>返回笔记库</span>
                </a>
              </Link>
            </div>
          </footer>
        </article>
      </div>
    </div>
  );
}

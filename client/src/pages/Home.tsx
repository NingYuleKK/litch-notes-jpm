import { useState, useMemo } from "react";
import { Link } from "wouter";
import { Search, X, BookOpen, User } from "lucide-react";
import { notes, categories, searchNotes } from "@/data/notes";
import { Button } from "@/components/ui/button";
import NewsletterSubscribe from "@/components/NewsletterSubscribe";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const filteredNotes = useMemo(() => {
    let result = notes;

    if (selectedCategory) {
      result = result.filter(note => note.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      result = searchNotes(searchQuery);
    }

    return result;
  }, [searchQuery, selectedCategory]);

  const groupedNotes = useMemo(() => {
    const grouped: { [key: string]: typeof notes } = {};
    filteredNotes.forEach(note => {
      if (!grouped[note.category]) {
        grouped[note.category] = [];
      }
      grouped[note.category].push(note);
    });
    return grouped;
  }, [filteredNotes]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Global Navigation */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-3 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2 text-warm-white hover:text-primary transition-colors">
              <BookOpen size={18} className="text-primary" />
              <span className="font-serif font-semibold text-base tracking-wide">Litch Notes</span>
            </a>
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/">
              <a className="px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors">
                笔记库
              </a>
            </Link>
            <Link href="/about">
              <a className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm text-muted-foreground hover:text-foreground hover:bg-card transition-colors">
                <User size={14} />
                About
              </a>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        className="relative w-full h-96 bg-cover bg-center flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/tlGrp1rD19DAKUed2XfnPW/sandbox/dqG53BhptLdn2nmZpPhl9g-img-1_1771744365000_na1fn_aGVyby1iZw.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdGxHcnAxckQxOURBS1VlZDJYZm5QVy9zYW5kYm94L2RxRzUzQmhwdExkbjJubVpwUGhsOWctaW1nLTFfMTc3MTc0NDM2NTAwMF9uYTFmbl9hR1Z5YnkxaVp3LmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=vyJIfXp9iTjpqDz5FT8q-6u8z4T1F67PSihuQx1WZYH4B8r19NgHlkLfHWsT9f1LH9bMYaq-VoNcIP7RAcl-OdmENLNQjosVb10YfjghT5SVnJXW1FmoWTqPzXd5eN7wmh2FrpAMf1cLZe3asrVo0F05T7FS5W~u7VixZs6Ass8qj2kSrqJ0OrkAk7z82ENvYMMB2eAYicKSDkyiTuc9lva~323wn-3nVIedB4Ikq8GPP5rYidc4Yu7h-DH7fmpXDm1d1oe5PCjxqJ1RDcc5ojT64OCYpMM9bj378J-rUJwQXSKIwhbJrJe-zRmbnSM0vhwLjFS~b7OnRPD2pLmzYQ__')`
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-warm-white mb-2">
            Litch Notes
          </h1>
          <p className="text-xl md:text-2xl text-amber-light font-serif">
            闲步金瓶梅
          </p>
          <p className="text-sm md:text-base text-warm-gray mt-4 max-w-2xl mx-auto">
            一个人类与若干智能一起共读金瓶梅的角落
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="container py-12 md:py-16">
        {/* Search and Filter Bar */}
        <div className="mb-12">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              {showSearchInput ? (
                <div className="relative">
                  <input
                    type="text"
                    placeholder="搜索笔记标题、标签或内容..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                    className="w-full px-4 py-2 bg-card border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <button
                    onClick={() => {
                      setSearchQuery("");
                      setShowSearchInput(false);
                    }}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    <X size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowSearchInput(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Search size={18} />
                  <span>搜索笔记</span>
                </button>
              )}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground border border-border hover:border-primary"
              }`}
            >
              全部笔记
            </button>
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                title={cat.desc}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === cat.name
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground border border-border hover:border-primary"
                }`}
              >
                {cat.name} ({cat.count})
              </button>
            ))}
          </div>
        </div>

        {/* Notes Display */}
        {Object.keys(groupedNotes).length > 0 ? (
          <div className="space-y-12">
            {Object.entries(groupedNotes).map(([category, categoryNotes]) => (
              <div key={category}>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6 pb-3 border-b border-border">
                  {category}
                </h2>
                <div className="grid gap-6 md:gap-8">
                  {categoryNotes.map((note) => (
                    <Link key={note.id} href={`/note/${note.id}`}>
                      <a className="group block">
                        <div className="bg-card border border-border rounded-lg p-6 md:p-8 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1">
                          <div className="flex flex-col gap-3 mb-4">
                            <h3 className="text-xl md:text-2xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
                              {note.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                📅 {note.created.split(" ")[0]}
                              </span>
                              <span className="flex items-center gap-1">
                                🔗 {note.source.join(", ")}
                              </span>
                            </div>
                          </div>

                          <p className="text-foreground/80 mb-4 leading-relaxed line-clamp-3">
                            {note.excerpt}
                          </p>

                          <div className="flex flex-wrap gap-2">
                            {note.tags.slice(0, 5).map((tag) => (
                              <span
                                key={tag}
                                className="inline-block px-3 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                              >
                                #{tag}
                              </span>
                            ))}
                            {note.tags.length > 5 && (
                              <span className="inline-block px-3 py-1 text-xs text-muted-foreground">
                                +{note.tags.length - 5} 个标签
                              </span>
                            )}
                          </div>
                        </div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              {searchQuery ? "未找到匹配的笔记" : "暂无笔记"}
            </p>
          </div>
        )}
      </div>

      {/* Newsletter Subscribe */}
      <NewsletterSubscribe />
    </div>
  );
}

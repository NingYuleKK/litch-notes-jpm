import { useState, useRef } from "react";
import { Mail, Send, CheckCircle, AlertCircle } from "lucide-react";

const ICON_URL = "https://files.manuscdn.com/user_upload_by_module/session_file/86672527/MSPSMeYVXnQgKDWo.png";

type SubmitState = "idle" | "submitting" | "success" | "error";

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setState("submitting");

    try {
      const formData = new FormData();
      formData.append("email", email);

      const res = await fetch(
        "https://buttondown.com/api/emails/embed-subscribe/litchnotes",
        {
          method: "POST",
          body: formData,
          mode: "no-cors",
        }
      );

      // no-cors mode always returns opaque response, treat as success
      setState("success");
      setEmail("");
    } catch {
      setState("error");
    }
  };

  return (
    <section className="border-t border-border bg-card/50">
      <div className="container py-16 md:py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Icon */}
          <div className="mb-6 flex justify-center">
            <img
              src={ICON_URL}
              alt="Litch Notes"
              className="w-20 h-20 rounded-xl object-cover opacity-90"
            />
          </div>

          {/* Heading */}
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-3">
            订阅 Litch Notes
          </h2>
          <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-lg mx-auto leading-relaxed">
            不定期发送新笔记通知与阅读碎想。
            <br className="hidden md:block" />
            一封来自深夜书房的信。
          </p>

          {/* Form */}
          {state === "success" ? (
            <div className="flex items-center justify-center gap-2 text-green-400 py-4">
              <CheckCircle size={20} />
              <span className="text-sm">订阅成功，感谢你的关注。</span>
            </div>
          ) : (
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="relative flex-1">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error") setState("idle");
                  }}
                  className="w-full pl-9 pr-4 py-2.5 bg-background border border-border rounded-lg text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                />
              </div>
              <button
                type="submit"
                disabled={state === "submitting"}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {state === "submitting" ? (
                  <>
                    <span className="animate-spin">⏳</span>
                    <span>提交中...</span>
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    <span>订阅</span>
                  </>
                )}
              </button>
            </form>
          )}

          {state === "error" && (
            <div className="flex items-center justify-center gap-2 text-red-400 mt-3">
              <AlertCircle size={16} />
              <span className="text-xs">提交失败，请稍后重试。</span>
            </div>
          )}

          {/* Powered by */}
          <p className="text-xs text-muted-foreground/50 mt-6">
            Powered by{" "}
            <a
              href="https://buttondown.com/litchnotes"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-muted-foreground transition-colors"
            >
              Buttondown
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

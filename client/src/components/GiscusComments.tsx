import Giscus from "@giscus/react";

export default function GiscusComments() {
  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="text-lg font-serif font-semibold text-foreground mb-6">
        评论与讨论
      </h3>
      <Giscus
        id="giscus-comments"
        repo="NingYuleKK/litch-notes-jpm"
        repoId="R_kgDORV9SZQ"
        category="General"
        categoryId="DIC_kwDORV9SZc4C2-cv"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme="dark"
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}

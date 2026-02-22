/**
 * About Litch 页面
 * 设计风格：深夜书房暗色调，与整站一致
 * 字体：serif 为主，保持文学气质
 * 布局：居中单栏，留白充裕，段落间有呼吸感
 */

import { Link } from "wouter";
import { ArrowLeft, Mail } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky top nav */}
      <div className="sticky top-0 z-40 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="container py-4 flex items-center justify-between">
          <Link href="/">
            <a className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
              <ArrowLeft size={20} />
              <span>返回首页</span>
            </a>
          </Link>
          <span className="text-muted-foreground text-sm font-serif">About Litch</span>
        </div>
      </div>

      {/* Hero strip — subtle, not full-height */}
      <div
        className="relative w-full h-48 md:h-56 bg-cover bg-center overflow-hidden"
        style={{
          backgroundImage: `url('https://private-us-east-1.manuscdn.com/sessionFile/tlGrp1rD19DAKUed2XfnPW/sandbox/dqG53BhptLdn2nmZpPhl9g-img-2_1771744362000_na1fn_bm90ZS1kZXRhaWwtYmc.jpg?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvdGxHcnAxckQxOURBS1VlZDJYZm5QVy9zYW5kYm94L2RxRzUzQmhwdExkbjJubVpwUGhsOWctaW1nLTJfMTc3MTc0NDM2MjAwMF9uYTFmbl9ibTkwWlMxa1pYUmhhV3d0WW1jLmpwZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=am8VIjmA8iS0gkU2DoKJj7TSl5eruPuUgwzV2PBBHmFJIO1VvoMTIY46crDMu-V7NcUz3Uh-W6lncGU5slgUN1qbIJCn-fOwVAI6zq8COT4fGUxYSL5iUbp~Xhl00heM8jtdHft~IBbB5YpnJ8arC6w~-N9HxLQns3cOxyXNyFhNvmp9X1relepAQsnr-7obTc0silrP6D5FAuqf~MYXdPr~Y2iJJSV82LU8z5NzhXnhgKEfusVLcNulBpB1LyJ9r23PF9ODP63F72OZJTu~Js-qP1R-r6fXB-uVNl1Q-fwOb7SI7xMaYE8rXWJwvFpjWoEg9FaSaKnFRS1cJIZLhQ__')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-background" />
      </div>

      {/* Main content */}
      <div className="container pb-20">
        <article className="max-w-2xl mx-auto -mt-8 relative z-10">

          {/* Name heading */}
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-warm-white mb-3 tracking-wide">
              Litch
            </h1>
            <div className="w-12 h-px bg-primary opacity-70" />
          </header>

          {/* Body copy */}
          <div className="space-y-8 text-foreground/85 leading-[1.95] font-serif text-[1.05rem]">

            <p>
              长期在互联网行业工作，也在书本里生活。金瓶梅痴客一枚。
            </p>
            <p>
              白天做产品和系统设计，晚上把时间分给小说、史书、哲学，还有和智能体的长谈。
            </p>

            {/* Divider */}
            <div className="py-2">
              <div className="w-full h-px bg-border" />
            </div>

            <p className="text-muted-foreground text-sm uppercase tracking-widest font-sans">
              关于这个站点
            </p>

            <p>
              这个站点是我的精神缓冲区：把零散的灵感、对经典的重新阅读，以及还没长成正式文章的想法，先安放在这里。
            </p>

            {/* Divider */}
            <div className="py-2">
              <div className="w-full h-px bg-border" />
            </div>

            {/* Contact */}
            <div>
              <p className="text-muted-foreground text-sm uppercase tracking-widest font-sans mb-4">
                联系
              </p>
              <p className="mb-4">
                如果你有想一起聊的书、想法或实验，欢迎写信给我：
              </p>
              <a
                href="mailto:wangxinmi@gmail.com"
                className="inline-flex items-center gap-3 px-5 py-3 bg-card border border-border rounded-lg text-primary hover:border-primary hover:bg-card/80 transition-all group"
              >
                <Mail size={18} className="text-primary group-hover:scale-110 transition-transform" />
                <span className="font-mono text-sm tracking-wide">wangxinmi@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Footer nav */}
          <footer className="mt-16 pt-8 border-t border-border">
            <Link href="/">
              <a className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
                <ArrowLeft size={18} />
                <span>返回笔记库</span>
              </a>
            </Link>
          </footer>
        </article>
      </div>
    </div>
  );
}

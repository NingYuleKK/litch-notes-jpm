import { Link } from "wouter";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-serif font-bold text-primary mb-4">404</h1>
        <p className="text-2xl font-serif text-foreground mb-2">页面未找到</p>
        <p className="text-muted-foreground mb-8">
          抱歉，您访问的页面不存在。
        </p>
        <Link href="/">
          <a className="inline-block px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity">
            返回首页
          </a>
        </Link>
      </div>
    </div>
  );
}

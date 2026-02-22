# HANDOVER.md — Litch Notes 闲步金瓶梅

> 最后更新：2026-02-22 | 维护者：Litch (wangxinmi@gmail.com)

---

## 一、项目概述

**Litch Notes 闲步金瓶梅** 是一个个人读书笔记网站，副标题为「一个人类与若干智能一起共读金瓶梅的角落」。

站点定位是 Litch 的精神缓冲区：把对《金瓶梅》的逐回阅读、版本对勘、人物分析、与 AI 的深度讨论，以及瞬时灵感，以笔记形式沉淀下来。内容兼具学术严肃性与个人感受，风格是深夜书房式的暗色学院派。

网站功能：
- 首页展示所有笔记，支持按分类筛选和关键词搜索
- 笔记详情页渲染 Markdown 全文（含引用、加粗、标题层级）
- About 页面介绍作者 Litch
- 全局导航栏（笔记库 / About）

---

## 二、技术栈

| 层级 | 技术 |
|------|------|
| 框架 | React 19 |
| 样式 | Tailwind CSS 4 + shadcn/ui |
| 构建 | Vite 7 |
| 语言 | TypeScript 5.6 |
| 路由 | Wouter 3 |
| Markdown 渲染 | Streamdown |
| 包管理 | pnpm |
| 部署平台 | Manus Webdev (静态托管) |

---

## 三、项目结构说明

```
jpm-notes/
├── client/
│   ├── index.html              # HTML 入口，含 Google Fonts 引用
│   ├── public/                 # 静态资源（直接映射到网站根路径）
│   └── src/
│       ├── App.tsx             # 路由配置（Wouter Switch/Route）
│       ├── main.tsx            # React 入口
│       ├── index.css           # 全局样式 + Tailwind 设计 token
│       ├── const.ts            # 客户端常量
│       ├── data/
│       │   └── notes.ts        # ★ 核心数据文件：笔记数组 + 分类数组
│       ├── pages/
│       │   ├── Home.tsx        # 首页（Hero + 分类筛选 + 笔记列表）
│       │   ├── NoteDetail.tsx  # 笔记详情页（Markdown 渲染）
│       │   ├── About.tsx       # About Litch 页面
│       │   └── NotFound.tsx    # 404 页面
│       ├── components/
│       │   ├── ui/             # shadcn/ui 基础组件
│       │   └── ErrorBoundary.tsx
│       ├── contexts/
│       │   └── ThemeContext.tsx # 主题上下文（当前固定 light，实为暗色变量）
│       ├── hooks/              # 自定义 React hooks
│       └── lib/
│           └── utils.ts        # cn() 等工具函数
├── server/
│   └── index.ts                # Express 静态文件服务（生产环境用）
├── shared/
│   └── const.ts                # 前后端共享常量（当前为占位）
├── package.json
├── pnpm-lock.yaml
├── vite.config.ts
├── tsconfig.json
└── HANDOVER.md                 # 本文件
```

**最需要关注的文件：`client/src/data/notes.ts`**，所有笔记内容和分类定义都在这里。

---

## 四、笔记数据格式

### 4.1 Note 接口定义

```typescript
interface Note {
  id: string;           // 唯一 ID，建议格式：YYYYMMDD_NNN（如 "20260222_001"）
  title: string;        // 笔记标题
  category: string;     // 分类名称（必须是下方7个分类之一）
  source: string[];     // 来源，如 ["Litch"] 或 ["GPT", "Claude"]
  tags: string[];       // 标签数组
  created: string;      // 创建日期，格式 "YYYY-MM-DD" 或 "YYYY-MM-DD HH:mm:ss"
  excerpt: string;      // 摘要（显示在列表卡片上，建议 80-150 字）
  content: string;      // 正文（Markdown 格式，用模板字符串 `` ` `` 包裹）
}
```

### 4.2 添加新笔记的步骤

1. 打开 `client/src/data/notes.ts`
2. 在 `export const notes: Note[] = [` 数组的**最前面**插入新笔记对象（最新笔记排在最前）
3. 更新文件末尾 `categories` 数组中对应分类的 `count` 字段（+1）
4. 保存文件，开发服务器会自动热更新

### 4.3 新笔记模板

```typescript
{
  id: "YYYYMMDD_001",
  title: "笔记标题",
  category: "对勘札记",   // 从7个分类中选一个
  source: ["Litch"],      // 或 ["GPT", "Claude"] 等
  tags: ["标签1", "标签2"],
  created: "2026-01-01",
  excerpt: "这里是摘要，显示在列表卡片上，80-150字为宜。",
  content: `# 笔记标题

> **分类**: 对勘札记 | **来源**: Litch | **时间**: 2026-01-01
> **标签**: 标签1, 标签2

---

正文内容，支持完整 Markdown 语法。

> 引用格式用 blockquote

**加粗**、*斜体*、\`代码\` 均可使用。`
},
```

### 4.4 content 字段注意事项

- 使用 JavaScript 模板字符串（反引号 `` ` ``）包裹
- 如果正文中出现反引号，需转义为 `` \` ``
- 如果正文中出现 `${`，需转义为 `\${`
- 建议用 Python 脚本写入长文（避免编辑器截断），参考项目根目录的 `rebuild_notes.py`

---

## 五、7个分类说明

| 分类名 | 定位 | 典型内容 |
|--------|------|----------|
| **对勘札记** | 词话本 vs 绣像本逐回对照 | 两个版本的文字差异、结构调整分析 |
| **副本路径** | 阅读经验和 meta 讨论 | 读书方法、版本选择、阅读路径规划 |
| **人物小案** | 人物分析档案 | 西门庆、潘金莲、李瓶儿等人物深度分析 |
| **欢喜风物** | 吃饭、器物、日常生活细节 | 书中食物、器具、节令风俗的考证与感受 |
| **评点共读** | 与历代评论者的对话 | 与张竹坡、东吴弄珠客、现代学者的对话 |
| **人智对话** | 与 AI 的深度讨论 | 与 GPT、Claude 等 AI 的深度对谈记录 |
| **灵感片段** | 瞬时火花库 | 阅读时的即时感受、未成形的想法碎片 |

---

## 六、本地开发

### 环境要求

- Node.js 18+
- pnpm（推荐）或 npm

### 启动步骤

```bash
# 1. 安装依赖
pnpm install
# 或
npm install

# 2. 启动开发服务器（热更新）
pnpm dev
# 或
npm run dev

# 3. 浏览器打开
# http://localhost:3000
```

### 构建生产版本

```bash
pnpm build
# 产物在 dist/public/ 目录
```

### 其他命令

```bash
pnpm check    # TypeScript 类型检查
pnpm format   # Prettier 格式化
```

---

## 七、部署方式（Manus Webdev）

本项目托管在 **Manus Webdev** 平台（静态前端托管）。

### 部署流程

1. 在 Manus 对话中完成代码修改
2. 调用 `webdev_save_checkpoint` 保存检查点
3. 在 Management UI 右上角点击 **Publish** 按钮发布
4. 网站自动部署到 `xxx.manus.space` 永久域名

### 自定义域名

在 Management UI → **Settings → Domains** 中可以：
- 修改 `.manus.space` 的子域名前缀
- 绑定已有自定义域名
- 在平台内购买新域名

### 项目信息

- 项目名：`jpm-notes`
- 项目路径：`/home/ubuntu/jpm-notes`（Manus 沙箱内）
- 最新 Checkpoint：`9163b0bd`

---

## 八、设计风格说明

### 设计哲学

**深夜书房暗色学院派**（Dark Academic）：以明代书斋为意象，营造沉浸式阅读氛围。

### 配色

| 用途 | 值 | 说明 |
|------|-----|------|
| 背景 | `#0d0b08` / `oklch(0.08 0.01 60)` | 极深暖黑，接近墨色 |
| 主文字 | `oklch(0.85 0.02 65)` | 暖米白 |
| 次要文字 | `oklch(0.55 0.015 65)` | 暖灰 |
| 强调色 | `#c8922a` / `oklch(0.65 0.12 65)` | 琥珀金，用于标题、激活态 |
| 边框 | `oklch(1 0 0 / 8%)` | 极淡白色边框 |
| 卡片背景 | `oklch(0.12 0.01 60)` | 略亮于背景的深色 |

### 字体

- **标题**：`Noto Serif SC`（衬线中文，学院感）
- **正文**：`Noto Sans SC`（无衬线中文，易读性）
- **英文/数字**：`EB Garamond`（古典衬线英文）

字体通过 Google Fonts CDN 引入（见 `client/index.html`）。

### 核心视觉元素

- **Hero 背景**：古籍书桌场景图（暗色调，书房意象）
- **分类按钮**：暗色胶囊形，激活时琥珀金高亮
- **笔记卡片**：深色卡片 + 细边框，hover 时微亮
- **Markdown 渲染**：`prose-note` 自定义样式类，blockquote 左侧金色边框

### 设计原则

1. 文字可读性优先，背景不干扰阅读
2. 克制使用颜色，仅强调色用于关键交互
3. 间距宽松，营造"翻书"的呼吸感
4. 避免过度动效，保持沉静

---

## 九、后续开发建议

### 内容层面

1. **持续添加笔记**：按7个分类逐步填充，尤其是「对勘札记」（核心分类）和「欢喜风物」（特色分类）
2. **完善 About 页面**：可增加「正在读」书单模块，或当前阅读进度（第几回）

### 功能层面

3. **笔记详情页导航**：增加「上一篇 / 下一篇」按钮，方便同分类内连续阅读
4. **版本对照视图**：为「对勘札记」分类增加左右分栏布局，直观展示词话本 vs 绣像本差异
5. **标签聚合页**：点击标签跳转到同标签笔记列表
6. **RSS Feed**：生成 RSS/Atom 订阅源，方便读者订阅更新

### 技术层面

7. **数据持久化**：当笔记数量增多（>50条），考虑将 `notes.ts` 拆分为多个文件，或迁移到 JSON/Markdown 文件系统
8. **搜索增强**：当前搜索为前端全文搜索，笔记量大时可引入 Fuse.js 做模糊搜索
9. **升级为全栈**：如需后台管理、用户评论等功能，可通过 Manus `webdev_add_feature` 升级为 `web-db-user` 模式

---

## 十、联系方式

- 作者：Litch
- 邮箱：wangxinmi@gmail.com
- GitHub：[NingYuleKK/litch-notes-jpm](https://github.com/NingYuleKK/litch-notes-jpm)

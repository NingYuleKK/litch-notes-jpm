# HANDOVER.md — Litch Notes 闲步金瓶梅 项目交接文档

> 最后更新：2026-02-23  
> 维护者：Litch (wangxinmi@gmail.com)  
> GitHub：https://github.com/NingYuleKK/litch-notes-jpm  
> 线上地址：https://litchnotes.com

---

## 1. 项目概述

**Litch Notes 闲步金瓶梅** 是一个个人阅读笔记网站，记录 Litch 与多个 AI 智能体（Claude、GPT、Gemini 等）共读《金瓶梅》的深度笔记、对话和灵感。网站采用深夜书房暗色学院派设计风格，目前包含首页（笔记库）、笔记详情页、About 页面三个主要页面。

核心功能包括：分类浏览、全文搜索、Markdown 渲染、Buttondown 邮件订阅、Giscus 评论系统。

---

## 2. 技术栈

| 技术 | 版本 | 用途 |
|------|------|------|
| React | 19 | UI 框架 |
| TypeScript | 5.6 | 类型安全 |
| Tailwind CSS | 4 | 样式系统 |
| Vite | 7 | 构建工具和开发服务器 |
| Wouter | 3 | 客户端路由 |
| shadcn/ui | — | UI 组件库 |
| Streamdown | — | Markdown 渲染 |
| @giscus/react | — | GitHub Discussions 评论 |
| Framer Motion | — | 动画（已安装，可选用） |

---

## 3. 项目结构

```
jpm-notes/
├── client/
│   ├── index.html                  # HTML 入口（含 SEO meta 标签）
│   ├── public/                     # 静态资源
│   └── src/
│       ├── App.tsx                 # 路由定义（/, /about, /note/:id）
│       ├── main.tsx                # React 入口
│       ├── index.css               # 全局样式、设计 token、自定义颜色
│       ├── pages/
│       │   ├── Home.tsx            # 首页：Hero + 分类筛选 + 笔记列表 + Newsletter
│       │   ├── NoteDetail.tsx      # 笔记详情页：正文 + Giscus 评论
│       │   ├── About.tsx           # About Litch 页面
│       │   └── NotFound.tsx        # 404 页面
│       ├── components/
│       │   ├── NewsletterSubscribe.tsx  # Buttondown 邮件订阅组件
│       │   ├── GiscusComments.tsx       # Giscus 评论组件
│       │   ├── ErrorBoundary.tsx        # 错误边界
│       │   └── ui/                      # shadcn/ui 组件库
│       ├── data/
│       │   └── notes.ts            # ⭐ 核心数据文件：所有笔记和分类定义
│       ├── contexts/
│       │   └── ThemeContext.tsx     # 主题上下文
│       └── hooks/                  # 自定义 hooks
├── server/
│   └── index.ts                    # 生产环境静态文件服务（部署用）
├── shared/
│   └── const.ts                    # 共享常量
├── package.json
├── vite.config.ts
└── tsconfig.json
```

---

## 4. 笔记数据格式

所有笔记数据存储在 `client/src/data/notes.ts` 中。这是一个纯前端静态数据文件，没有数据库。

### Note 接口定义

```typescript
interface Note {
  id: string;          // 唯一标识，格式如 "20260222_001"
  title: string;       // 笔记标题
  category: string;    // 分类名称，必须是 categories 中定义的名称之一
  tags: string[];      // 标签数组
  source: string[];    // 来源（如 "Litch", "Claude", "GPT"）
  created: string;     // 创建时间，格式 "YYYY-MM-DD" 或 "YYYY-MM-DD HH:MM:SS"
  excerpt: string;     // 摘要，用于列表页展示
  content: string;     // 完整正文，支持 Markdown 格式
}
```

### 添加新笔记的步骤

1. 打开 `client/src/data/notes.ts`
2. 在 `notes` 数组的**开头**插入新笔记对象（最新的排在前面）
3. 更新文件底部 `categories` 数组中对应分类的 `count` 值
4. content 字段使用模板字符串（反引号 `` ` ``），注意转义内部的反引号和 `${` 语法

### 注意事项

content 字段中如果包含 `${}` 或反引号，需要转义处理。建议用 Python 脚本生成长文本的 notes.ts 内容，避免手动编辑出错。

---

## 5. 七个分类

| 分类名称 | 描述 | 当前笔记数 |
|---------|------|-----------|
| 对勘札记 | 词话本 vs 绣像本逐回对照 | 1 |
| 副本路径 | 阅读经验和 meta 讨论 | 0 |
| 人物小案 | 人物分析档案 | 0 |
| 欢喜风物 | 吃饭、器物、日常生活细节 | 0 |
| 评点共读 | 与历代评论者的对话 | 0 |
| 人智对话 | 与 AI 的深度讨论 | 3 |
| 灵感片段 | 瞬时火花库 | 0 |

分类定义在 `notes.ts` 文件底部的 `categories` 数组中，每个分类包含 `name`、`count`、`desc` 三个字段。添加新笔记后需手动更新对应分类的 `count`。

---

## 6. 现有笔记清单

| ID | 标题 | 分类 | 来源 | 日期 |
|----|------|------|------|------|
| 20260222_001 | 杀虎vs杀嫂：金瓶梅中武松的暴力同构 | 对勘札记 | Litch | 2026-02-22 |
| 20260221_132752 | 黄霖用词'淫妇'的性别不对称——跨语言分析 | 人智对话 | Claude | 2026-02-21 |
| 20260221_132930 | 欢喜心与慈悲——兰陵笑笑生的世俗热爱与日常细节之美 | 人智对话 | Claude, Gemini | 2026-02-21 |
| 20260221_134326 | 金瓶梅作为开源副本——文本生态学与grokking的断代层 | 人智对话 | GPT, Claude | 2026-02-21 |

---

## 7. 集成服务

### Buttondown Newsletter

组件文件：`client/src/components/NewsletterSubscribe.tsx`，位于首页底部。

| 配置项 | 值 |
|--------|-----|
| Username | litchnotes |
| API Endpoint | `https://buttondown.com/api/emails/embed-subscribe/litchnotes` |
| 公开页面 | `https://buttondown.com/litchnotes` |
| Icon CDN | `https://files.manuscdn.com/user_upload_by_module/session_file/86672527/MSPSMeYVXnQgKDWo.png` |

### Giscus 评论

组件文件：`client/src/components/GiscusComments.tsx`，位于每篇笔记详情页底部。

| 配置项 | 值 |
|--------|-----|
| repo | NingYuleKK/litch-notes-jpm |
| repoId | R_kgDORV9SZQ |
| category | General |
| categoryId | DIC_kwDORV9SZc4C2-cv |
| mapping | pathname |
| theme | dark |
| lang | zh-CN |

**前置条件：** 仓库必须为 Public，且已安装 [giscus GitHub App](https://github.com/apps/giscus)。

---

## 8. 本地开发

```bash
# 克隆仓库
git clone https://github.com/NingYuleKK/litch-notes-jpm.git
cd litch-notes-jpm

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

开发服务器默认运行在 `http://localhost:3000`。

---

## 9. 部署方式

网站部署在 **Manus 内置托管平台**上，域名 `litchnotes.com` 在 Manus 内购买并自动管理 DNS。

### 部署流程

1. 在 Manus 对话窗口中修改代码
2. 执行 `webdev_save_checkpoint` 创建检查点
3. 在 Management UI 点击 **Publish** 按钮发布

### 重要说明

Manus webdev 项目绑定在创建它的对话窗口上。如果需要在新窗口中继续开发，需要：

1. 新窗口执行 `webdev_init_project` 创建同名项目
2. 从 GitHub 拉取最新代码覆盖进去
3. 修改后 save checkpoint → Publish
4. 在 Settings → Domains 重新绑定 litchnotes.com

### GitHub 同步

每次在 Manus 中改完代码后，建议同时：
- `webdev_save_checkpoint` → Publish（更新线上）
- 打包代码 `git push` 到 GitHub（更新备份）

推送配置：`git config user.name "NingYuleKK"` / `git config user.email "wangxinmi@gmail.com"`

---

## 10. 设计风格

网站采用 **深夜书房暗色学院派** 风格。

### 配色体系

| 用途 | 颜色 | 说明 |
|------|------|------|
| 背景 | `#1a1410` / `oklch(0.12 0.02 60)` | 深褐黑色，书房底色 |
| 前景文字 | `#f5f0e8` | 暖白色 |
| 主色调 | `oklch(0.65 0.15 70)` | 琥珀金，用于按钮和强调 |
| 卡片背景 | `oklch(0.18 0.02 60)` | 略浅于背景的暗褐色 |
| 辅助文字 | `oklch(0.55 0.03 60)` | 暖灰色 |

### 字体

| 用途 | 字体 |
|------|------|
| 中文衬线（标题） | Noto Serif SC |
| 中文无衬线（正文） | Noto Sans SC |
| 英文衬线（品牌） | Playfair Display, Crimson Text |
| 代码 | JetBrains Mono |

### Hero 背景图

首页使用 AI 生成的深夜书房场景图，CDN 地址在 `Home.tsx` 的 `backgroundImage` 中。

---

## 11. SEO 配置

在 `client/index.html` 中已配置：

| 标签 | 内容 |
|------|------|
| title | Litch Notes 闲步金瓶梅 — 人类与智能共读金瓶梅的笔记角落（35字符） |
| description | Litch Notes 是一个人类与若干智能一起共读金瓶梅的角落，涵盖对勘札记、人物分析、人智对话、评点共读等深度阅读笔记，探索词话本与绣像本的文本世界。（77字符） |
| keywords | 金瓶梅, 闲步金瓶梅, Litch Notes, 词话本, 绣像本, 对勘札记, 人智对话, 人物分析, 读书笔记, AI共读, 兰陵笑笑生, 古典文学 |

---

## 12. 后续开发建议

以下是可以继续推进的方向，按优先级排列：

1. **子页面动态 SEO**：为 `/about` 和 `/note/:id` 页面用 `useEffect` 设置动态 `document.title` 和 meta description，提升搜索引擎可见性。

2. **Open Graph / Twitter Card**：添加社交媒体分享 meta 标签，让笔记链接在微信、Twitter 等平台分享时展示标题和封面图。

3. **sitemap.xml + robots.txt**：帮助搜索引擎索引全站内容。

4. **笔记内容持续填充**：为「副本路径」「人物小案」「欢喜风物」「评点共读」「灵感片段」等空分类添加笔记。

5. **数据库化**：当笔记数量增长到一定规模后，可以考虑用 `webdev_add_feature` 升级为全栈项目，将笔记存入数据库，支持后台管理和在线编辑。

---

## 13. 给新 Manus 窗口的提示词模板

如果需要在新的 Manus 对话窗口中继续开发，可以使用以下提示词：

> 请继续开发我的网站项目「Litch Notes 闲步金瓶梅」。
> GitHub 仓库：https://github.com/NingYuleKK/litch-notes-jpm
> 请先阅读仓库中的 HANDOVER.md 了解项目结构和当前状态。
> 线上地址：https://litchnotes.com
> Git 配置：user.name "NingYuleKK"，user.email "wangxinmi@gmail.com"
>
> 以下是我需要的修改：
> （在此写具体需求）

# 个人网站

这是一个以长期维护为目标的静态个人网站。项目不需要构建工具或依赖安装；页面文件放在 `public/`，GitHub Pages 通过 GitHub Actions 发布该目录。

正式网站为 <https://hyq128.github.io/>，后续网站更新只维护 [`hyq128/hyq128.github.io`](https://github.com/hyq128/hyq128.github.io) 仓库。

## 项目结构

```text
.
├── .github/workflows/deploy.yml  # 发布到 GitHub Pages
├── docs/
│   ├── CONTENT_GUIDE.md          # 页面内容与图片维护说明
│   └── WORKFLOW.md               # Git / GitHub 与提交约定
├── public/
│   ├── assets/                   # photos/ 个人照片、projects/ 项目截图
│   ├── css/                      # 全站与 Vibe Coding 页面样式
│   ├── js/                       # 导航、经历画廊与作品截图预览
│   ├── index.html                # 首页内容与区块结构
│   └── vibe-coding.html          # 旧作品链接重定向至首页 #ai-work
├── AGENTS.md                     # 面向 AI 编码助手的项目约定
├── CHANGELOG.md                  # 每次提交对应的变更记录
└── README.md
```

## 本地预览

在项目根目录运行：

```bash
python3 -m http.server 4173 --directory public
```

然后打开 `http://localhost:4173`。按 `Ctrl+C` 停止服务器。直接打开 `public/index.html` 也能查看页面，但使用本地服务器更接近 GitHub Pages 的访问方式。

## 页面维护

- 页面标题、区块和内容：编辑 `public/index.html`。
- 颜色、字体、排版和响应式样式：编辑 `public/css/styles.css`。
- 导航菜单、滚动动画等交互：编辑 `public/js/main.js`。
- Vibe Coding 作品：编辑 `public/index.html` 的 `#ai-work` 区域；专用样式在 `public/css/vibe-coding.css`，截图放大交互在 `public/js/vibe-coding.js`，项目截图放在 `public/assets/projects/`。
- 照片放入 `public/assets/photos/`；图片使用方式和内容维护建议见 [`docs/CONTENT_GUIDE.md`](docs/CONTENT_GUIDE.md)。
- 分支、提交、文档同步与部署步骤见 [`docs/WORKFLOW.md`](docs/WORKFLOW.md)。
- AI 编码助手开始工作前应阅读 [`AGENTS.md`](AGENTS.md)。
- 变更历史见 [`CHANGELOG.md`](CHANGELOG.md)。

页面以招聘者为首要读者，采用连续滚动的单页结构。首页区块顺序为关于、经历、AI 作品、项目、文章；AI 作品区完整展示 Vibe Coding 作品，至少占一屏并保留舒展留白；内容自然向下展开，主导航直接定位到 `#ai-work`，无需进入另一页。经历区将两段教育和四段实习放入同一个整屏吸顶的 360° 3D 环形画廊：六张图文卡片按完整圆周排布，页面滚动驱动旋转，停止滚动后缓慢自转，并通过透明度体现景深；底部轻量成长轨迹同步标记当前经历，当前节点展开完整日期和职位，也可点击或用键盘选择对应卡片，手机端可横向滑动。首页求职方向为产品经理与项目经理，AI 的实际使用与快速学习作为个人特质呈现；教育背景位于跨行业经历概述之前，经历中公司名称链接至公司介绍。首屏用大号英文衬线字展示求职方向，以浅灰色胶囊标签、深色主按钮和浅网格照片卡片组织信息；其余页面延续奶油白底色、克制的粉色强调及清晰的中文字体。Vibe Coding 区域展示用户提供的简历排版器截图、简短介绍和“敬请期待”卡片；工具支持输入岗位 JD，由 AI 分析并帮助修改简历，同时提供排版与导出。截图可点击放大，GitHub 按钮仅显示“GitHub”，在真实仓库链接提供前保持禁用。文章区显示准备中，不放虚构案例或占位文章。照片和经历来自个人提供的素材；不公开私人联系方式，也不发布整份简历。

旧的 `vibe-coding.html` 仅负责跳转至首页作品区域，不再维护独立内容。

## 发布

推送或合并到 `main` 后，`.github/workflows/deploy.yml` 会把 `public/` 发布到 GitHub Pages。首次启用时，在仓库 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。

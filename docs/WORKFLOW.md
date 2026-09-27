# Git、GitHub 与文档维护

## 分支

- `main` 始终代表当前正式版本；GitHub Pages 只从 `main` 部署。
- 每项明确改动使用短期分支，例如 `feat/add-projects`、`fix/mobile-nav`、`docs/update-workflow`。
- 尽量先在本地确认页面能够运行，再进行正式修改；改动后检查页面和差异。若环境无法预览，记录限制，不要宣称已验证。
- 一个明确的功能或修改对应一个 commit。个人小改动可以直接提交到 `main`；较大的改动在短期分支提交后合并到 `main`。

## 提交

提交信息采用 `类型: 内容` 格式，描述具体变化，不使用 `update` 之类的泛化词。

常用类型：

- `feat`: 新增页面或功能
- `fix`: 修复问题
- `style`: 视觉与排版调整
- `refactor`: 不改变用户可见行为的代码整理
- `docs`: 文档更新
- `chore`: GitHub Actions、项目配置等维护工作

示例：

- `feat: add project case studies`
- `style: improve portfolio layout on mobile`
- `docs: document local preview and release flow`

每个 commit 聚焦一个完整任务。提交前检查 `git status --short` 和 `git diff --staged`，只暂存当前需求相关的文件。GitHub 上的提交邮箱应使用 GitHub 提供的 noreply 邮箱，避免公开私人邮箱。

## 每次提交前同步文档

提交前逐一审阅 `README.md`、`AGENTS.md`、`docs/CONTENT_GUIDE.md` 和本文件，确认内容与当前代码、目录结构、设计和发布流程一致；相关内容有变化时，在同一 commit 中更新对应文档。每个 commit 都要在 `CHANGELOG.md` 增加简洁记录。不要为了形式对无关文档做空洞改动。

## 本地检查与发布

1. 修改前尽量在本地预览现有页面，修改后检查桌面和手机宽度下的主要区块与导航。
2. 完成一个明确改动后，同步相关文档和 `CHANGELOG.md`，审阅差异并创建对应 commit。
3. 将分支推送到 GitHub；合并到 `main` 后，`.github/workflows/deploy.yml` 会把 `public/` 发布到 GitHub Pages。
4. 首次启用时，在仓库的 **Settings → Pages → Build and deployment** 中选择 **GitHub Actions**。

## 敏感信息

- 不提交 API Key、密码、访问令牌、私钥或本地 `.env` 文件。根目录 `.gitignore` 已忽略常见的环境变量文件和私钥文件。
- 静态网页中的 JavaScript 对访客可见，不要在前端代码中放任何需要保密的 API Key。
- 如果未来确实需要服务器端密钥，把它们保存为 GitHub Actions Secrets 或服务端环境变量，不要写进网页文件。
- 如果密钥已经提交，先撤销并轮换密钥；仅从当前文件删除并不能清除 Git 历史。

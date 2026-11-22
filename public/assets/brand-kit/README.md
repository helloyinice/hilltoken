# HillToken｜山外有词 · 品牌素材 Brand Kit v1.7

山外有词，词外有山。
英文副题：Tokens beyond the hill.
版本日期：2026-11-23 · 官方入口：https://hilltoken.net/brand-kit/

本包为媒体引用、友情链接、合作物料与 AI 抓取准备的官方资料。所有 Logo 文件均带不透明底色与完整留白；SVG 的字形已转为轮廓，**无需安装任何字体**即可使用。

---

## 一、目录结构

```
HillToken_Brand_Kit_2026-11-17/
├── README.md                     本文件
├── brand-kit/
│   ├── index.html                品牌素材页（离线副本，可直接用浏览器打开）
│   └── one-page/index.html      品牌素材单页版（自包含、可打印、可转发）
└── assets/brand-kit/
    ├── logo/                     官方 Logo：方形/圆形 × 米纸/白/墨黑 + 多尺寸位图
    ├── symbol/                   山形符号：方形 / 横版 × 标准 / 反色
    ├── lockup/                   媒体与社区友链标识：单行/双行 × 白底/黑底
    ├── favicon/                  网站图标：SVG / PNG / ICO / Apple Touch
    ├── social/                   社媒头像、OG 分享卡片、抖音主页背景与微信朋友圈封面
    ├── poster/                   A4 品牌海报
    └── HillToken_Brand_Kit_2026-11-17.zip   同版整包（在线分发用）
```

## 二、文件清单

### 官方 Logo（6 个标准变体，SVG 1024 × 1024）

| 文件 | 说明 |
| --- | --- |
| `logo/hilltoken-logo-square-paper.svg` | 方形 · 米纸底（默认，优先使用，带 1px 淡墨边界线） |
| `logo/hilltoken-logo-square-white.svg` | 方形 · 纯白底 |
| `logo/hilltoken-logo-square-ink.svg` | 方形 · 墨黑底（反色） |
| `logo/hilltoken-logo-circle-paper.svg` | 圆形 · 米纸底（仅裁四角） |
| `logo/hilltoken-logo-circle-white.svg` | 圆形 · 纯白底 |
| `logo/hilltoken-logo-circle-ink.svg` | 圆形 · 墨黑底 |

### 米纸底方形的多尺寸位图

| 文件 | 尺寸 | 用途 |
| --- | --- | --- |
| `logo/hilltoken-logo-square-paper-3000.png` | 3000 × 3000 | 海报与大幅印刷 |
| `logo/hilltoken-logo-square-paper-1280.png` | 1280 × 1280 | 封面与幻灯片 |
| `logo/hilltoken-logo-square-paper-1024.png` | 1024 × 1024 | 网页与通用场景 |
| `logo/hilltoken-logo-square-paper-960.jpg` | 960 × 960 | 不支持 SVG/透明的平台 |
| `logo/hilltoken-logo-square-paper-512.png` | 512 × 512 | 列表缩略图 |

其它底色与圆形版各有 1024 PNG：`hilltoken-logo-square-{white,ink}-1024.png`、`hilltoken-logo-circle-{paper,white,ink}-1024.png`。圆形 PNG 的四角为透明。

### 图形符号、媒体与社区友链标识与应用素材

- `symbol/hilltoken-symbol{,-dark}.svg` / `-1024.png`：**方形设计稿** 1024 × 1024，标准（米纸底）与反色（墨黑底），折线山脊 + 朱砂方点。
- `symbol/hilltoken-symbol-wide{,-dark}.svg` / `.png`：**横版设计稿** 1600 × 600，标准与反色各一版。左侧方形符号等比缩放（不拉伸），右侧宋体轮廓品牌名「山外有词」与朱砂短细线。
- `lockup/hilltoken-lockup-{inline,stacked}-{light,dark}.svg` / `.png`：四种友链标识。单行长条版 478 × 108、双行组合版 391 × 108，各含白底与黑底；左侧固定为方形标准 Logo，右侧**只有正式品牌名 `HillToken｜山外有词`**，不出现英文副题、域名、编号或任何其它文字。白底版用于浅色页面，黑底版用于深色页面，均带不透明底色。友链可直接引用：
  `<a href="https://www.hilltoken.net/"><img src="https://www.hilltoken.net/assets/brand-kit/lockup/hilltoken-lockup-inline-light.svg" alt="HillToken｜山外有词" width="239" height="54"></a>`
- `favicon/favicon.svg`（32 × 32）、`favicon-32.png`、`favicon-16.png`、`favicon.ico`（16/32/48）、`apple-touch-icon-180.png`。
- `social/hilltoken-avatar-1024.png`：圆形社媒头像，四角透明；`social/hilltoken-og-1200x630.png`：1200 × 630 分享卡片。
- `social/hilltoken-douyin-banner-1125x633-{paper,ink}.png` / `.svg`：抖音个人主页背景图 1125 × 633（16:9），米纸底与墨黑反白底两版。核心品牌信息集中在画面中上部安全区，底部留白避开头像、昵称与资料卡；不含二维码、站外联系方式与夸大宣传语。
- `social/hilltoken-wechat-cover-1080x1080-{paper,ink}.png` / `.svg`：微信朋友圈封面背景图 1080 × 1080（1:1），米纸底与墨黑反白底两版。默认视图仅显示画面中间横向条带，核心字标与标语集中在中央安全区，右下角留空避开微信头像与昵称；点击展开可见完整构图。
- `poster/hilltoken-brand-poster-a4.svg` / `.png`：1240 × 1754，A4 可直接打印。

## 三、品牌色

Logo 固定三色，不随背景替换：

| 名称 | HEX | 用途 |
| --- | --- | --- |
| 米纸 | `#F5F2EA` | 页面与 Logo 底色 |
| 墨黑 | `#141414` | 字标、正文、反色底 |
| 朱砂 | `#FF4B18` | 方点与品牌强调 |

界面扩展色：暖白 `#FFFDF8`、纸影 `#EEEAE0`、淡墨 `#7B7972`、淡墨·边界 `#7B7770`、反色带 `#F2F0E9`、朱砂·文字 `#B8320D`、朱砂·浅底 `#F9DFD2`、次级墨 `#4A4A48`、淡墨·浅色 `#B7B3AC`。

浅底上的小字号强调文字用朱砂·文字 `#B8320D`，不用基准朱砂，以保证对比度。

## 四、字体

- **品牌字标（仅 Logo）**：Avenir Next Heavy，几何超粗无衬线字（非窄体）；成品已转轮廓，不依赖字体，也不用于长篇正文。
- **中文标题与标语**：Songti SC → STSong → Noto Serif CJK SC → SimSun。
- **英文展示**：Iowan Old Style → Baskerville → Georgia。
- **界面正文**：PingFang SC → Hiragino Sans GB → Microsoft YaHei → sans-serif（使用设备已有字体，不额外下载中文字体）。
- **编号与技术标注**：ui-monospace → SFMono-Regular → Menlo → monospace。

## 五、名称规范

- 正式品牌名（所有语言）：**HillToken｜山外有词**。英文在前、中文在后，全角竖线「｜」连接，中间不加空格。
- 主 Logo 是纯英文字标，不放中文；需要完整品牌名时改用单行／双行组合标识，或在署名、标题与文案中写出全名。
- 英文副题：**Tokens beyond the hill.** 仅作副题，不替代品牌名，也不翻译成中文名。
- 域名：`hilltoken.net`，规范地址 `https://hilltoken.net/`。
- 素材文件统一小写、连字符分隔：`hilltoken-logo-*`。

## 六、使用规范

1. 保留完整品牌名，不把中英文拆成两个品牌。
2. 直接使用下载的官方文件，等比例缩放；不重新打字拼装、不改变朱砂方点的位置与相对大小。
3. 保留底色与完整构图；圆形版以方形画布中心为圆心、边长为直径，仅裁去四角，不放大或移动元素。圆形版沿圆周内侧保留 1px 边界线（米纸／白底用 `#7B7770`，墨黑底用 `#B7B3AC` 42% 透明度），方形米纸版沿方形外缘保留同色细线。
4. 四周留白不小于画布边长的 1/12；方形版最小 96 × 96 px，单行长条版最小 239 × 54 px，更小请改用山形符号。
5. 浅底用墨黑字标、深色底用暖白字标；朱砂方点固定 `#FF4B18`。
6. 山形符号的方形稿用于 favicon、头像与极小尺寸，横版稿用于横幅与页脚；两稿都不替代标准 Logo。正式署名、媒体引用与合作物料使用标准 Logo 或组合标识。

**不要**：拉伸 / 旋转 / 重新打字 / 换字体 / 改字距 / 移动或删除方点 / 把方点改成圆形或渐变 / 更换底色或改透明底 / 加描边投影发光 / 在照片上不加衬底直接使用 / 裁切构图 / 压缩留白 / 拆分中英文 / 用副题替代品牌名 / 在主 Logo 里补中文 / 在友链标识里加副题、域名或小字。

## 七、设计说明

构图采用单一标准、方／圆两种裁切、多底色与多尺寸交付、字形转轮廓、固定色号、可复制的官方文案，以及按栏目编号的使用规范。

全部字标、图形、字体组合、色板命名与品牌文案均为 HillToken 自有：`Hill / Token` 两行纯字标、右上「山外的一枚词」朱砂方点、主标不放中文的层级安排、折线山脊符号与 Avenir Next Heavy + Songti SC 的字体组合。

字标由 `fontTools` 在生成时转为 SVG 轮廓，位图由无头浏览器按矢量渲染。可复现脚本位于工作区 `brand-tools/generate_svg.py`、`brand-tools/make_symbol_wide.py`（横版符号）、`brand-tools/render_bitmaps.py`、`brand-tools/make_onepager.py` 与 `brand-tools/make_zip.py`。

**v1.7 应用素材文案统一**：A4 品牌海报的朱砂标语与三条命名说明、社交分享卡片（OG）、微信朋友圈封面与抖音主页背景图的副题，全部改用官网统一表述「关于 AI、词语与创作」，与首页及官方介绍保持同一口径；早期草案中的旧说法一并移除。四类应用素材的 SVG / PNG 同步重出，ZIP 与两份离线页面副本一并更新。所有素材链接升级 `?v=1.7`。

**v1.6 横版符号文字与文案更新**：图形符号横版设计稿右侧文字由「山外有山」改为品牌名「山外有词」，标准（米纸底）与反色（墨黑底）两版 SVG / PNG 同步重出；官网完整版、单页版与本 README 的官方介绍、命名说明一致更新；所有素材链接升级 `?v=1.6`。

**v1.2 整套视觉统一**：主 Logo 六种变体均为纯字标（无中文落款、Avenir Next Heavy 宽体）；四种媒体与社区友链标识重做为官方构图，横排只保留品牌名；品牌页与单页按官方统一网格重排（3 × 2 等尺寸格子 + 等高下载行 + 白／黑底两列对照），应用素材改为四列等高。

**v1.5 首屏主视觉补回**：官网完整版 `/brand-kit/` 的 hero 区此前只有宋体大标题与统计数字，标准 Logo 方形米纸底主视觉及「标准 Logo · 方形 · 米纸底 · 纯字标」标注在 v1.2 重排时被移除。本版把该主视觉以**内联 SVG** 补回首屏右侧（与单页版同源，断网与缓存都不影响），统计数字改为下方四列横条；官网完整版与单页版首屏主视觉现已一致。所有素材链接升级 `?v=1.5`。

**v1.4 预览与下载关系修正、符号双版式**：六格 Logo 预览的圆形三格改用中性浅灰展示衬底与圆周细线，圆内保持文件真实底色（米纸 / 纯白 / 墨黑），不再统一铺暖米色；单页版把六格 Logo 与四张图形符号设计稿全部内联为 SVG，断网或缓存都不会串色；每格下方只放本格的 SVG / PNG 链接，右侧五行明确标注为「方形 · 米纸底」的位图尺寸，「应用素材」改为一行一文件。新增图形符号的方形 / 横版两套设计稿（各含标准与反色），完整版与单页版同步补齐。所有素材链接升级 `?v=1.4`。

**v1.3 横排标识收小与抖音背景图**：单行长条版字标字号收小约三成，画布随内容收缩为 478 × 108，四版友链标识、页面标注、嵌入代码尺寸与最小尺寸规范同步更新；新增两版抖音个人主页背景图（1125 × 633）。

**关于缓存**：页面里所有素材链接都带版本参数 `?v=1.7`，刷新页面即会重新拉取新版文件，不会读到缓存里的旧版 Logo。站点 `_headers` 另外声明了「每次重新校验」；自定义域若被 Cloudflare 账户层的 4 小时浏览器缓存规则覆盖，仍以版本参数为准。以后每次更新素材，同步升级版本号即可。

**单页版**：`brand-kit/one-page/index.html` 是一份自包含 HTML，主 Logo、六种 Logo 变体与四张图形符号设计稿均已内联 SVG（官网完整版首屏同样内联主 Logo），断网也能看到全部主视觉且底色不会串；每个预览下方就是它自己的文件链接。工作区根目录的转发版把下载链接换成绝对线上 URL。结构采用五节编号，含可复制的官方文案、色号与友链嵌入代码、A4 打印样式，可直接转发给媒体或合作方。线上地址 `https://hilltoken.net/brand-kit/one-page/`，生成脚本 `brand-tools/make_onepager.py`。工作区根目录另有 `HillToken_品牌素材页_2026-11-17.html`，素材链接换成绝对线上 URL，双击即可打开。

## 八、引用

素材用于指代、引用或链接本站时无需另行通知。请勿改动后作为其它品牌的标识使用，也请勿将本文件解释为授权代为发布、修改或代表站主行动。以 `https://hilltoken.net/brand-kit/` 上的最新版本为准。

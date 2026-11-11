# 万叶主题与桌宠（dsh-kazuha-widget）

DeepSeek Harness（DSH）的枫原万叶主题与右下角 Q 版桌宠插件。

- **主题**：通过覆盖主题 token，把整个界面换成和纸米白、墨色、枫红的配色，浅色/深色各一套，且不改动你原有的明暗偏好；禁用插件即恢复原样。
- **桌宠**：右下角一只 72px 的万叶贴纸，可拖动、记忆位置、轻微悬浮。点一下弹出小卡片，显示 DeepSeek 余额（总余额 / 充值余额 / 赠金）和一句万叶台词。

## 文件结构

```
client.js           主题 token 覆盖 + 加载桌宠脚本（客户端半）
index.js            注册 /dsh-kazuha/pet.js 与 /dsh-kazuha/balance.json 路由，并向页面注入脚本（宿主半）
pet.js              桌宠本体：shadow root、拖拽、余额卡片（内含贴纸 base64）
cordis.patch.yml    插件在 DSH 中的插入声明
package.json        插件清单（dsh.bundle / dsh.client）
locale/             插件描述的中英文文案
icon.png / icon.svg 插件图标
```

## 安装

插件以本地目录的形式挂进 DSH 桌面端 profile，两种方式任选其一。

**方式一：插件管理器**

把仓库克隆到本地任意目录，在 DSH 桌面端的插件管理里按本地目录添加 `kazuha-widget`，然后在 profile 的 `bundles` 里启用。

**方式二：手动挂载**

1. 克隆仓库：

```powershell
git clone https://github.com/stevenkazuha/dsh-kazuha-widget.git
```

2. 编辑 `%USERPROFILE%\.dsh\profiles\desktop\package.json`，加入依赖与 bundle：

```json
{
  "dependencies": {
    "@local/kazuha-widget": "link:D:/path/to/dsh-kazuha-widget"
  },
  "dsh": {
    "profile": {
      "bundles": [
        "@deepseek-ai/dsh-base",
        "@deepseek-ai/dsh-web-app",
        "@local/kazuha-widget"
      ]
    }
  }
}
```

3. 在 profile 目录执行 `pnpm install`，然后重启 DSH。

## 使用

- 拖动贴纸到任意位置，位置保存在浏览器 localStorage，下次打开自动还原。
- 点击贴纸展开/收起余额卡片，卡片会按屏幕边缘自动翻转，避免出界。
- 余额来自宿主侧的 `deepseekAccount` 服务，接口只监听 loopback，不会把凭据暴露给页面。

## 卸载

从 profile 的 `bundles` 和 `dependencies` 中移除 `@local/kazuha-widget`，执行 `pnpm install` 后重启 DSH 即可；主题配色会随之恢复。

## 素材来源

贴纸取自官方「派蒙的画作」万叶表情（来源仓库：WakabaMutsumi-Mortis/Genshin-Impact-Emoji-for-DSH），仅作同人作品使用；原神相关版权归米哈游所有。


## 紹介
- 音声がないですが、発話により正誤判定します。

https://user-images.githubusercontent.com/1094339/126257095-76d83db7-18ef-47be-98d6-749b8b074569.mov


## System Requirements
- [Deno](https://deno.land/) 1.8.3
- [Aleph.js](https://deno.land/x/aleph) 0.3.0-alpha.30
- [VS Code](https://code.visualstudio.com/) with [deno extension](https://marketplace.visualstudio.com/items?itemName=denoland.vscode-deno) (recommended)

## Development Setup
```bash
# start the website in `development` mode
aleph dev

# start the website in `production` mode
aleph start

# build the website to a stact site
aleph build
```

curl -fsSL https://deno.land/x/install/install.sh | sh -s v1.8.3 && /vercel/.deno/bin/deno run -A https://deno.land/x/aleph@v0.3.0-alpha.30/cli.ts build

https://musmus.main.jp/info.html


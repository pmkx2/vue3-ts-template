# Vue 3 + Typescript + Vite

- 该模版为不包含 UI 框架的初始模版，作为后续版本的基础模版
- 该模版对开发规范比较严格，培养开发人员良好的编码习惯
- 项目文件结构可自行修改，但开发组需要制定并遵守统一的结构规范

---

## 技术栈

为了保持开发的一致性，统一使用 Visual Studio Code 作为日常开发编辑器

| 技术栈     | 列表                                                                                                                | 说明                                       |
| :--------- | :------------------------------------------------------------------------------------------------------------------ | :----------------------------------------- |
| 编辑器     | Visual Studio Code                                                                                                  |                                            |
| 编辑器扩展 | EditorConfig for VS Code <br>Vetur <br>Vite <br>ESLint <br>Prettier - Code formatter <br>GitLens — Git supercharged | 需要在编辑器扩展中搜索安装                 |
| 依赖包管理 | yarn                                                                                                                |                                            |
| 拦截提交   | Husky <br>Lint-Staged                                                                                               |                                            |
| 代码规范   | Prettier <br>ESLint                                                                                                 | 需要在代码提交前进行一次代码格式化操作     |
| 网络请求   | Axios                                                                                                               | 网络请求进行了基础的封装，可按实际需求修改 |
| 样式预处理 | Sass                                                                                                                |                                            |
| Vue        | Vue 3.x <br>Vue-router 4 <br>Pinia (替代 vuex)                                                                      |                                            |
| 构建       | Vite                                                                                                                |                                            |

---

## 预设环境

一般项目中只需要使用以下 4 个环境即可，对应着根目录下的`.env.xxx`配置文件，如有需要则添加对应的环境配置文件和命令

- 开发环境：development (`.env.development`)
- 集成测试：sit (`.env.sit`)
- 验收测试：uat (`.env.uat`)
- 生产环境：production (`.env.production`)

---

## 仓库管理

使用`husky`进行 git 提交前的拦截，如无法正常提交，需运行`yarn lint`检测一遍存在问题的代码，逐一修改，目前检测的文件类型为：`.ts`，`.tsx`，`.vue`，`.js`，`.jsx`

---

## 命令行操作：

| 服务           | 命令                              | 说明                           |
| :------------- | :-------------------------------- | :----------------------------- |
| 启动程序       | `yarn dev`                        |                                |
| 构建：集成测试 | `yarn build:sit`                  |                                |
| 构建：预发环境 | `yarn build:uat`                  |                                |
| 构建：生产环境 | `yarn build:prod` 或 `yarn build` |                                |
| 代码格式化     | `yarn prettier`                   | 按 prettier 规范进行格式化处理 |

---

## 目录结构说明

```js
|- package.json       |- 项目配置文件
|- vite.config.ts     |- Vite配置文件
|- tsconfig.json      |- Typescript 配置文件
|- .editorconfig      |- IDE工具基础 配置文件（内含说明）
|- .prettierrc        |- Prettier 配置文件
|- .prettierignore    |- Prettier 忽略文件列表配置
|- .eslintrc.js       |- ESLint 配置文件
|- .eslintignore      |- ESLint 忽略文件列表配置
|- .gitignore         |- git 忽略文件列表配置
|- .env.development   |- 环境配置文件：开发环境
|- .env.sit           |- 环境配置文件：测试环境
|- .env.uat           |- 环境配置文件：预发环境（用户验收测试）
|- .env.production    |- 环境配置文件：生产环境
|- index.html         |- App主页
|- /.husky            |- husky 规则文件
|- /.vscode           |- vscode 编辑器配置文件
|- /typings           |- Typescript 类型声明文件夹
   |- xxx.d.ts           |- 各类型声明文件
|- /public            |- 公开资源文件夹
|- /src               |- App主程序文件夹
   |- main.ts            |- App主程序
   |- App.vue            |- App.vue
   |- /api               |- api文件夹
      |- index.ts           |- 请求入口文件
      |- request.ts         |- 请求配置文件
      |- /modules           |- 模块文件夹
         |- types.ts           |- 类型声明文件
         |- xxx.ts             |- 各模块的API请求定义
   |- /assets            |- 静态资源
      |- /style                |- 样式文件夹
   |- /router            |- 路由配置
      |- index.ts              |- 路由定义
      |- /modules              |- 路由定义模块
   |- /store             |- 数据持久化
      |- index.ts              |- 数据持久化入口
      |- /modules              |- 持久化模块
   |- /components        |- 组件
   |- /pages             |- 页面
```

---

## 问题记录：

#### 1、prettier 格式化不生效 单引号无效

此问题是由于 prettier3.7 以上会优先读取项目根目录下的 `.editorconfig` or `.prettierrc`，如果有这个文件，就不会使用 vscode setting 中的设置，为了统一每个项目的规范，需要在项目中配置一个单独的 .prettierrc 配置文件

.prettierrc

```js
{
  "tabWidth": 2,
  "jsxSingleQuote": true,
  "jsxBracketSameLine": true,
  "printWidth": 300,
  "singleQuote": true,
  "semi": false
}
```

#### 2、报"The ESM module loader is experimental..."错误

`npx lint-staged` 一旦出现报错问题"The ESM module loader is experimental..."的错误，需要检查 node 版本是否低于模块所需的版本，是则需要安装更新版本的 node

---

### 代码校验与修复

```js
// package.json

"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "*.{js,jsx,vue,ts,tsx}": [
    "yarn lint",
    "prettier --write"
  ]
}
```

`pre-commit` 此处为每次提交代码时进行自动化的规范校验变更，代码会自动按照规范来修正代码，对应着`lint-staged`内的命令行指令，规则上会按顺序执行两种修复，修复完毕后会继续提交

1、eslint："lint": "eslint src --fix --ext .ts,.tsx,.vue,.js,.jsx"

2、prettier："prettier": "prettier --write ."

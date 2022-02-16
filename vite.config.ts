// 英文：https://vitejs.dev/config/
// 中文：https://cn.vitejs.dev/config/

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import viteCompression from 'vite-plugin-compression'

export default ({ mode }) => {
  // 获取项目环境标识，带有'VITE_'开头的参数会被'loadEnv'获取
  const VITE_ENV = loadEnv(mode, process.cwd()).VITE_ENV

  return defineConfig({
    define: {
      'process.env': {},
    },
    resolve: {
      // 引用别名
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    // 样式配置
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/style/main.scss";',
        },
      },
    },
    // 服务配置
    server: {
      // 是否自动打开浏览器
      open: false,
      // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      host: '0.0.0.0',
      // 服务器端口号
      port: 8088,
      // 设为 true ,若端口已被占用则会直接退出，而不是尝试下一个可用端口
      strictPort: false,
      // 为开发服务器配置 CORS
      cors: true,
      // 设置为 true 强制使依赖预构建
      force: true,
      // 代理
      proxy: {
        // '/api': {
        //   target: 'http://xxx.xxx.xx',
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(/^\/api/, ''),
        // },
      },
    },
    // 项目构建
    build: {
      // 是否压缩
      minify: 'esbuild',
      // 资源路径
      assetsDir: '',
      // 输出路径
      outDir: `./dist/${VITE_ENV}`,
      // 进行压缩计算
      brotliSize: false,
      terserOptions: {
        compress: {
          // 清除 console
          drop_console: true,
          // 清除 debugger
          drop_debugger: true,
        },
      },
    },
    // 插件
    plugins: [
      vue(),
      // gzip压缩 生产环境生成 .gz 文件
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
      }),
    ],
  })
}

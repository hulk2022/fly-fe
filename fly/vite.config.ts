import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createStyleImportPlugin } from 'vite-plugin-style-import';
import { resolve } from 'path';


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => { 
  // 根据当前工作目录中的 `mode` 加载 .env 文件
	// 设置第三个参数为 '' 来加载所有环境变量，而不管是否有 `VITE_` 前缀。
  const env = loadEnv(mode, process.cwd(), '');
  const isDev = env.NODE_ENV === 'development';
  console.log('isDev: ', isDev);

  const staging = env['STAGING'] || '';
  console.log(`-------${staging}-------`);

  const publicBase = '/';
  
  const port = parseInt(env['PORT'] || '5000', 10);
  const host = env['HOST'] || '0.0.0.0';
  
  return {
    base: publicBase,
    resolve: {
			alias: {
				'~': resolve(__dirname, 'src'),
			},
		},
    esbuild: {
			target: 'chrome78',
    },
    server: {
      port,
      host,
			open: `/`,
		},
    css: {
			preprocessorOptions: {
				less: {
					javascriptEnabled: true, // 支持内联 JavaScript
					modifyVars: {
						'primary-color': '#0089FF',
						'link-color': '#006AFE',
					},
				},
			},
		},
    plugins: [
      react(),
      createStyleImportPlugin({
				resolves: [],
				libs: [
					{
						libraryName: 'antd',
						esModule: true,
						resolveStyle: (name) => {
							return `antd/es/${name}/style/index`;
						},
					},
				],
			}),
    ]
  }
})


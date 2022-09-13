import resolve from "rollup-plugin-node-resolve"; // 依赖引用插件
import commonjs from "rollup-plugin-commonjs"; // commonjs模块转换插件
import babel from "rollup-plugin-babel"; // babel 插件

export default {
  input: "./src/index.js", // 打包的入口文件
  output: [
    {
      file: "./dist/fly-utils.cjs.js",
      format: "cjs",
    },
    {
      file: "./dist/fly-utils.js",
      format: "esm",
    },
  ],
  plugins: [
    // 使用的插件
    resolve(),
    commonjs(),
    babel({
      exclude: "node_modules/**",
      runtimeHelpers: true,
    }),
  ],
  ignore: [
    "node_modules/**", // 忽略目录
  ],
};

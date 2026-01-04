import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
export default {
  input: './packages/cli/bin/cli.js',
  output: {
    dir: 'dist',
    format: 'esm'
    // 移除 manualChunks，不将第三方包打包成 vendor
  },
  // 排除所有 node_modules 中的第三方包，让它们在运行时通过 require 加载
  external(id) {
    // 不排除内置模块
    return id.includes('node_modules') && !id.startsWith('node:')
  },
  plugins: [
    commonjs(),
    json(),
    resolve({
      browser: false,
      preferBuiltins: true
    })
  ]
}

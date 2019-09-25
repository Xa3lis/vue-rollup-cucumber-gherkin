import path from 'path'
import vue from 'rollup-plugin-vue'
import babel from 'rollup-plugin-babel'
import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import replace from 'rollup-plugin-replace'
import alias from 'rollup-plugin-alias'
import url from 'rollup-plugin-url'
import scss from 'rollup-plugin-scss'
import gherkin from 'rollup-plugin-gherkin'
import {
  eslint
} from 'rollup-plugin-eslint'
import builtins from 'rollup-plugin-node-builtins'
import globals from 'rollup-plugin-node-globals'

const {
  outputFileSync
} = require('fs-extra')

const isProduction = process.env.NODE_ENV === 'production'

export default (async () => ({
  input: './src/app.js',
  treeshake: true,
  cache: true,
  output: {
    dir: isProduction ? 'dist/assets/js' : 'public/assets/js',
    format: 'esm',
    strict: true,
    sourcemap: process.env.NODE_ENV === 'development',
    indent: false
  },
  plugins: [
    eslint({
      exclude: './node_modules/**',
      include: ['*/**.js', '*/**.vue']
    }),
    commonjs({
      include: [
        'node_modules/**'
      ],
      sourceMap: false
    }),
    nodeResolve({
      browser: true,
      mainFields: ['jsnext:main', 'module']
    }),
    vue({
      needMap: false
    }),
    alias({
      resolve: ['.js', '.vue'],
      vue: 'vue/dist/vue.esm.js',
      vue$: 'vue/dist/vue.common.js',
      // '@/*': 'src/***'
    }),
    isProduction && (await import('rollup-plugin-terser')).terser({
      sourcemap: false
    }),
    !isProduction && (
      await import('rollup-plugin-serve')).default({
      contentBase: './public',
      port: 8080,
      open: false
    }),
    !isProduction && (await import('rollup-plugin-livereload')).default(),
    scss({
      output: (styles, styleNodes) => {
        const path = isProduction ? './dist/css/app.css' : './public/assets/css/app.css'
        outputFileSync(path, styles.replace(/\/\*[^*]*\*+([^/][^*]*\*+)*\//gmi, '').trim())
      },
      sourceMapEmbed: process.env.NODE_ENV === 'development'
    }),
    json(),
    url({
      fileName: '[dirname][hash][extname]',
      sourceDir: path.join(__dirname, 'src')
    }),
    replace({
      'process.env.VUE_ENV': JSON.stringify('development')
    }),
    babel({
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false
          }
        ]
      ],
      plugins: [
        '@babel/plugin-syntax-dynamic-import'
      ],
      comments: false,
      babelrc: false,
      exclude: 'node_modules/**',
      runtimeHelpers: true
    }),
    globals(),
    builtins(),
    gherkin()
  ]
}))()

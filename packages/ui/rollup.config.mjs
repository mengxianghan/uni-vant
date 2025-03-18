import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import copy from 'rollup-plugin-copy'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
      },
      {
        file: 'dist/index.mjs',
        format: 'esm',
      },
    ],
    external: ['vue'],
    plugins: [
      del({ targets: 'dist' }),
      typescript(),
      resolve(),
      commonjs(),
      copy({
        targets: [
          { src: 'src/*/', dest: 'dist' },
        ],
      }),
      // babel({
      //   babelHelpers: 'bundled',
      //   exclude: ['node_modules/**'],
      //   extensions: ['.ts'],
      //   presets: ['@babel/preset-env'],
      // }),
      // terser(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'esm',
      },
    ],
    plugins: [
      dts(),
    ],
  },
]

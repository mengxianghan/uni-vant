import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
// import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import del from 'rollup-plugin-delete'
import dts from 'rollup-plugin-dts'

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.mjs',
        format: 'esm',
      },
    ],
    external: ['axios', '@uni-helper/axios-adapter'],
    plugins: [
      del({ targets: 'dist' }),
      typescript(),
      resolve(),
      commonjs(),
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

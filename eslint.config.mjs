import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '**/*.d.mts',
    '**/*.d.ts',
    '**/*.md',
    'docs/.vitepress/cache',
    'example/src/uni_modules',
    '**/*.tsconfig.json',
    '**/*.yaml',
    'packages/ui/dist',
    'packages/ui/tags.json',
    'packages/ui/web-type.json',
  ],
  formatters: {
    html: true,
    css: true,
  },
  rules: {
    'vue/no-reserved-component-names': 'off',
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'regexp/no-unused-capturing-group': 'off',
    'jsdoc/check-alignment': 'off',
    'jsdoc/check-types': 'off',
    'jsdoc/require-returns-description': 'off',
    'node/prefer-global/process': 'off',
    'no-useless-call': 'off',
    'ts/no-this-alias': 'off',
    'vue/max-attributes-per-line': ['error', {
      singleline: {
        max: 1,
      },
      multiline: {
        max: 1,
      },
    }],
  },
})

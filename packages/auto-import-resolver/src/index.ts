import type { ComponentResolver } from '@uni-helper/vite-plugin-uni-components'

function kebabCase(key: string) {
  const result = key.replace(/([A-Z])/g, ' $1').trim()
  return result.split(' ').join('-').toLowerCase()
}

export function UniVantResolver(): ComponentResolver {
  return {
    type: 'component',
    resolve: (name: string) => {
      if (name.startsWith('Van')) {
        const partialName = name.slice(3)
        const kebabCaseName = kebabCase(partialName)
        return {
          name: partialName,
          from: `uvant/dist/components/${kebabCaseName}/${kebabCaseName}.vue`,
          // sideEffects: `uvant/dist/components/${kebabCaseName}/index.scss`,
        }
      }
    },
  }
}

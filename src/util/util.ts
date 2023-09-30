/* Given an object, recursively log all of its properties to the console. */
export const logNestedObjectProperties = (obj: Record<string, unknown>, prefix = ''): void => {
  for (const key in obj) {
    if (typeof obj[key] === 'object') {
      logNestedObjectProperties(obj[key] as Record<string, unknown>, `${prefix}${key}.`)
    } else {
      console.log(`${prefix}${key}: ${obj[key]}`)
    }
  }
}

/* https://github.com/remarkjs/react-markdown/issues/164#issuecomment-1081647686 */
type MarkdownWithYamlFrontmatter<T> = {
  metadata: string
} & {
  [K in keyof T]?: string
}

/* Supports reading tags added to the top of a markdown file */
export const parseMarkdownWithYamlFrontmatter = <T extends Record<string, string>>(
  markdown: string
): MarkdownWithYamlFrontmatter<T> => {
  const metaRegExp = new RegExp(/^---[\n\r](((?!---).|[\n\r])*)[\n\r]---$/m)

  // "rawYamlHeader" is the full matching string, including the --- and ---
  // "yamlVariables" is the first capturing group, which is the string content between the --- and ---
  const [rawYamlHeader, yamlVariables] = metaRegExp.exec(markdown) ?? []

  if (!rawYamlHeader || !yamlVariables) {
    return { metadata: markdown }
  }

  const keyValues = yamlVariables.split('\n')

  const frontmatter = Object.fromEntries<string>(
    keyValues.map((keyValue) => {
      const splitted = keyValue.split(':')
      const [key, value] = splitted

      return [key ?? keyValue, value?.trim() ?? '']
    })
  ) as Record<keyof T, string>

  return { ...frontmatter, metadata: markdown.replace(rawYamlHeader, '').trim() }
}

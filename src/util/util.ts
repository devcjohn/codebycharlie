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

type parseMarkdownHeaders<T> = {
  [K in keyof T]: string
}

/* Adapted from https://github.com/remarkjs/react-markdown/issues/164#issuecomment-1081647686
 Frontmatter is a YAML block at the top of a markdown file that contains metadata about the file.
 react-markdown does not support reading this metadata, so we have to parse it ourselves. 
 Given an input of the form:

  ---
  header1: value1
  header2: value2
  ---
  # Markdown content

  This function will return:
  {
    header1: value1,
    header2: value2
  }

  Type T might be something like:
  {
    title: string,
    date: string,
  }
 */
export const parseMarkdownHeaders = <T extends Record<string, string>>(
  markdown: string
): parseMarkdownHeaders<T> => {
  const metaRegExp = new RegExp(/^---[\n\r](((?!---).|[\n\r])*)[\n\r]---$/m)

  /*  "rawYamlHeader" is the full matching string, including the --- and ---
   "yamlVariables" is the first capturing group, which is the string content between the --- and ---  */
  const [rawYamlHeader, yamlVariables] = metaRegExp.exec(markdown) ?? []

  if (!rawYamlHeader || !yamlVariables) {
    throw new Error('Expected YAML frontmatter to be present in markdown file')
  }

  const keyValues = yamlVariables.split('\n')

  const frontmatter = Object.fromEntries<string>(
    keyValues.map((keyValue) => {
      const splitted = keyValue.split(':')
      const [key, value] = splitted

      return [key ?? keyValue, value?.trim() ?? '']
    })
  ) as Record<keyof T, string>

  return frontmatter
}

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

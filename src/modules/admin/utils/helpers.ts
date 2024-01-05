// Typescript function that limit the length of a string and complete the rest with 3 dots
export function limitLength(str: string, limit: number = 7) {
  if (str.length > limit) {
    return str.substring(0, limit) + '...'
  }
  return str
}

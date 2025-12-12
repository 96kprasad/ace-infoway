// Capitalize first letter only
export const capitalizeFirst = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase()
}
// Capitalize first letter of string
export const capitalize = (str) => {
  if (!str) return ''
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

export const sizeFixed = (sizeInBytes: number, fixed: number = 2) => {
  if (sizeInBytes < 1024) {
    return `${sizeInBytes} B`
  }
  if (sizeInBytes < 1024 ** 2) {
    return `${(sizeInBytes / 1024).toFixed(fixed)} KB`
  }
  if (sizeInBytes < 1024 ** 3) {
    return `${(sizeInBytes / 1024 ** 2).toFixed(fixed)} MB`
  }
  return `${(sizeInBytes / 1024 ** 3).toFixed(fixed)} GB`
}

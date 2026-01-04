import { fileURLToPath } from 'url'
import { dirname } from 'path'
// 获取当前模块所在目录

function getDirName(url) {
  return dirname(fileURLToPath(url))
}

function getFileName(url) {
  return fileURLToPath(url)
}

export { getDirName, getFileName }

import path from 'node:path'
import fse from 'fs-extra'
import { pathExistsSync } from 'path-exists'
import { log } from '@quirks/utils'
import ora from 'ora'
function getCacheFilePath(targetPath, template) {
  return path.resolve(targetPath, 'node_modules', template.npmName, 'template')
}
const { ensureDirSync, removeSync, readdirSync, copySync } = fse

function copyFile(targetPath, template, installDir) {
  const originFile = getCacheFilePath(targetPath, template)
  const fileList = readdirSync(originFile)
  const spinning = ora('正在拷贝模板文件...').start()
  fileList.map((file) => {
    copySync(`${originFile}/${file}`, `${installDir}/${file}`)
  })
  spinning.stop()
  log.success('模板拷贝成功')
}

export default function installTemplate(selectTemplate, opts) {
  const { force = false } = opts
  const { targetPath, name, template } = selectTemplate
  const rootDir = process.cwd()
  ensureDirSync(targetPath)
  const installDir = path.resolve(`${rootDir}/${name}`)
  if (pathExistsSync(installDir)) {
    if (!force) {
      log.error(`当前目录已经存在 ${installDir} 的文件夹`)
      return
    } else {
      removeSync(installDir)
      ensureDirSync(installDir)
    }
  } else {
    ensureDirSync(installDir)
  }
  copyFile(targetPath, template, installDir)
}

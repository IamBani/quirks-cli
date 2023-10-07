import path from 'node:path'
import { pathExistsSync } from 'path-exists'
import { mkdirpSync } from 'fs-extra'
import ora from 'ora'
import { execa } from 'execa'
import { log } from '@quirks/utils'

function getCacheDir(targetPath) {
  return path.resolve(targetPath, 'node_modules')
}

function makeCacheDir(targetPath) {
  const cache = getCacheDir(targetPath)
  if (!pathExistsSync(cache)) {
    mkdirpSync(cache)
  }
}

async function downloadAddTemplate(targetPath, selectTemplate) {
  const { npmName, version } = selectTemplate
  const installCommand = 'npm'
  const installArgs = ['install', `${npmName}@${version}`]
  const cwd = getCacheDir(targetPath)
  log.verbose('installArgs', installArgs)
  log.verbose('cwd', cwd)
  const subprocess = execa(installCommand, installArgs, { cwd })
  await subprocess
}

export default async function downloadTemplate(selectTemplate) {
  const { targetPath, template } = selectTemplate
  makeCacheDir(targetPath)
  const spinning = ora('正在下载模板...').start()
  try {
    await downloadAddTemplate(targetPath, template)
    spinning.stop()
    log.success('下载模板成功')
  } catch (error) {
    spinning.stop()
    Promise.reject(error)
  }
}

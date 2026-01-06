import path from 'node:path'
import { program } from 'commander'
import fsExtra from 'fs-extra'
import semver from 'semver'
import chalk from 'chalk'
import { log, getDirName } from '@quirks-cli/utils'
import './exception.js'

const __dirname = getDirName(import.meta.url)

const pkgPath = path.resolve(__dirname, '../package.json')
const pkg = fsExtra.readJSONSync(pkgPath, 'utf8')

const LOWEST_NODE_VERSION = '14.0.0'

function checkNodeVersion() {
  log.verbose('node version', process.version)
  if (!semver.gte(process.version, LOWEST_NODE_VERSION)) {
    throw new Error(
      chalk.red(`quirks-cli 需要按转 ${LOWEST_NODE_VERSION}以上版本的 Node.js`)
    )
  }
}

function preAction() {
  try {
    checkNodeVersion()
  } catch (error) {
    log.error(error.message)
  }
}

export default function createCli() {
  log.info('version', pkg.version)
  program
    .name('quirks')
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d --debug', '是否开启调试模式', false)
    .hook('preAction', preAction)

  program.on('option:debug', function () {
    if (program.opts().debug) {
      log.verbose('debug', 'launch debug mode')
    }
  })

  program.on('command:*', function (opt) {
    log.error(`未知的命令 ${opt[0]}`)
  })
  return program
}

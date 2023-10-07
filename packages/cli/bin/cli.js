#! /usr/bin/env node

import importLocal from 'import-local'
import { dirname, filename } from 'dirname-filename-esm'

import { log } from '@quirks/utils'
import entry from '../lib/index.js'

const __filename = filename(import.meta)

if (importLocal(__filename)) {
  log.info('cli', '使用本次 quirks 版本')
  console.log('first', dirname)
} else {
  entry(process.argv.slice(2))
}

#! /usr/bin/env node
import importLocal from 'import-local'

import { log } from '@quirks/utils'
import entry from '../lib/index.js'
if (importLocal(import.meta.url)) {
  log.info('cli', '使用本次 quirks 版本')
} else {
  entry(process.argv.slice(2))
}

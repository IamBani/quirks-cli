'use strict'
import Command from '@quirks/command'
import { log } from '@quirks/utils'

import createTemplate from './createTemplate.js'
import downloadTemplate from './downloadTemplate.js'
import installTemplate from './installTemplate.js'
class InitCommand extends Command {
  get command() {
    return 'init [name]'
  }
  get description() {
    return 'init project'
  }
  get options() {
    return [['-f --force', '是否强制更新', false]]
  }
  async action([name, options]) {
    const selectTemplate = await createTemplate(name, options)
    log.verbose('template', selectTemplate)
    const downloaded = await downloadTemplate(selectTemplate)
    console.log(downloaded)
    await installTemplate(selectTemplate, options)
  }
}

function Init(program) {
  return new InitCommand(program)
}

export default Init

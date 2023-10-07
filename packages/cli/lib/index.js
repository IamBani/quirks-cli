import createInitCommand from '@quirks/init'

import createCli from './createCli.js'

export default function () {
  const program = createCli()
  createInitCommand(program)
  program.parse(process.argv)
}

import npmlog from 'npmlog'
import { debug } from './debug.js'
if (debug()) {
  npmlog.level = 'verbose'
} else {
  npmlog.level = 'info'
}
npmlog.heading = 'quirks'

npmlog.addLevel('success', 2000, { fg: 'green', bold: true })

export const log = npmlog

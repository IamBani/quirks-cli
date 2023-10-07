import { log, debug } from '@quirks/utils'

function printErrorLog(e, type) {
  if (debug()) {
    log.error(type, e)
  } else {
    log.error(type, e.message)
  }
}
process.on('uncaughtException', (e) => printErrorLog(e, 'error'))
process.on('unhandledRejection', (e) => printErrorLog(e, 'promise'))

import log from 'npmlog'
import { debug } from './debug.js'

const level = debug() ? 'verbose' : 'info'
log.level = level

// 添加自定义的 success 日志级别
log.addLevel('success', 2000, { fg: 'green', bold: true })

// 导出配置好的日志实例

export { log }

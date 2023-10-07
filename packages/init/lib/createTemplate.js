import { homedir } from 'node:os'
import path from 'node:path'
import { log, makeList, makeInput, getLatestVersion } from '@quirks/utils'

const ADD_TYPE_PAGE = 'page'
const ADD_TYPE_PROJECT = 'project'
const TEMP_HOME = '.quirks-cli'
const ADD_TEMPLATE = [
  {
    name: 'vue3项目模板',
    npmName: '@imooc.com/template-vue3',
    version: '1.0.1',
    value: 'template-vue3'
  },
  {
    name: 'react18项目模板',
    npmName: '@imooc.com/template-react18',
    version: '1.0.0',
    value: 'template-react18'
  }
]

const ADD_TYPE = [
  {
    name: '项目',
    value: ADD_TYPE_PROJECT
  },
  {
    name: '页面',
    value: ADD_TYPE_PAGE
  }
]
function getAddType() {
  return makeList({
    choices: ADD_TYPE,
    message: '请选择初始化',
    defaultValue: ADD_TYPE_PROJECT
  })
}
function getAddTypeName() {
  return makeInput({
    message: '请输入项目的名称',
    defaultValue: '',
    validate(y) {
      if (y.length > 0) {
        return true
      }
      return '项目名称必须输入'
    }
  })
}
function getAddTemplate() {
  return makeList({
    choices: ADD_TEMPLATE,
    message: '请选择项目模板'
  })
}

function getTargetPath() {
  return path.resolve(`${homedir()}/${TEMP_HOME}`, 'addTemplate')
}

export default async function createTemplate() {
  const addType = await getAddType()
  log.verbose('addType', addType)
  if (addType === ADD_TYPE_PROJECT) {
    const addName = await getAddTypeName()
    log.verbose('addName', addName)
    const addTemplate = await getAddTemplate()
    log.verbose(addTemplate, 'addTemplate')
    const selectTemplate = ADD_TEMPLATE.find((_) => _.value === addTemplate)
    log.verbose(selectTemplate, 'selectTemplate')
    const latestVersion = await getLatestVersion(selectTemplate.npmName)
    log.verbose('latestVersion', latestVersion)
    selectTemplate.version = latestVersion
    const targetPath = getTargetPath(selectTemplate)
    return {
      type: addType,
      name: addName,
      template: selectTemplate,
      targetPath
    }
  }
}

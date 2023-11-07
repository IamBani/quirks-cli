import { homedir } from 'node:os'
import path from 'node:path'
import { log, makeList, makeInput, getLatestVersion } from '@quirks/utils'

const ADD_TYPE_PAGE = 'page'
const ADD_TYPE_PROJECT = 'project'
const ADD_TYPE_PC = 'pc'
const ADD_TYPE_H5 = 'h5'

const TEMP_HOME = '.quirks-cli'
const ADD_TEMPLATE = [
  {
    name: '@imooc.com-vue3项目模板',
    npmName: '@imooc.com/template-vue3',
    version: '1.0.1',
    value: 'template-vue3'
  },
  {
    name: 'react18项目模板',
    npmName: '@imooc.com/template-react18',
    version: '1.0.0',
    value: 'template-react18'
  },
  {
    name: 'vue3项目模板',
    npmName: '@quirks/vue3-template',
    version: '1.0.1',
    value: '@quirks/vue3-template'
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
const ADD_TEMPLATE_TYPE = [
  {
    name: 'pc',
    value: ADD_TYPE_PC
  },
  {
    name: 'h5',
    value: ADD_TYPE_H5
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
function getAddTemplateType() {
  return makeList({
    choices: ADD_TEMPLATE_TYPE,
    message: '请选择项目类型',
    defaultValue: ADD_TYPE_PC
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

export default async function createTemplate(name, opt) {
  const { type = null, template, registry } = opt
  let { templateType } = opt
  let addType, addName, addTemplate, selectTemplate
  if (type) {
    addType = type
  } else {
    addType = await getAddType()
  }
  log.verbose('addType', addType)
  if (addType === ADD_TYPE_PROJECT) {
    if (name) {
      addName = name
    } else {
      addName = await getAddTypeName()
    }
    log.verbose('addName', addName)

    if (templateType) {
      templateType = ADD_TEMPLATE_TYPE.find((_) => {
        _.value === templateType
      })
      if (!templateType) {
        throw new Error(`项目模板类型${templateType}不存在`)
      }
    } else {
      const templateName = await getAddTemplateType()
      templateType = ADD_TEMPLATE_TYPE.find((_) => _.value === templateName)
    }
    log.verbose(templateType, 'templateType')
    if (template) {
      selectTemplate = ADD_TEMPLATE.find((_) => {
        _.value === template
      })
      if (!selectTemplate) {
        throw new Error(`项目模板${template}不存在`)
      }
    } else {
      addTemplate = await getAddTemplate()
      selectTemplate = ADD_TEMPLATE.find((_) => _.value === addTemplate)
    }
    log.verbose(addTemplate, 'addTemplate')
    log.verbose(selectTemplate, 'selectTemplate')

    const latestVersion = await getLatestVersion(
      selectTemplate.npmName,
      registry
    )
    log.verbose('latestVersion', latestVersion)
    selectTemplate.version = latestVersion
    const targetPath = getTargetPath(selectTemplate)
    return {
      type: addType,
      name: addName,
      templateType,
      template: selectTemplate,
      targetPath
    }
  } else {
    throw new Error(`创建的项目类型${addType}不支持`)
  }
}

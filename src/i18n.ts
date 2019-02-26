import * as fs from 'fs'
import * as yaml from 'js-yaml'
import * as path from 'path'
import { Config, I18nContext } from './context'

const compile = require('compile-template')

export class I18n {
  config: Config
  repository: { [key: string]: any } = {}

  constructor(config: Config) {
    this.config = Object.assign(
      {
        defaultLanguage: 'en',
        sessionName: 'session',
        allowMissing: true
      },
      config
    )
    if (this.config.directory) {
      this.loadLocales(this.config.directory)
    }
  }

  loadLocales(directory: string) {
    if (!fs.existsSync(directory)) {
      throw new Error(`Locales directory '${directory}' not found`)
    }
    const files = fs.readdirSync(directory)
    files.forEach(fileName => {
      const extension = path.extname(fileName)
      const languageCode = path.basename(fileName, extension).toLowerCase()
      if (extension === '.yaml' || extension === '.yml') {
        const data = fs.readFileSync(path.resolve(directory, fileName), 'utf8')
        this.loadLocale(languageCode, yaml.safeLoad(data))
      } else if (extension === '.json') {
        this.loadLocale(languageCode, require(path.resolve(directory, fileName)))
      }
    })
  }

  loadLocale(languageCode: string, i18Data: object) {
    const language = languageCode.toLowerCase()
    this.repository[language] = Object.assign(
      {},
      this.repository[language],
      compileTemplates(i18Data)
    )
  }

  resetLocale(languageCode?: string) {
    if (languageCode) {
      delete this.repository[languageCode.toLowerCase()]
    } else {
      this.repository = {}
    }
  }

  middleware() {
    return (ctx: { i18n: I18nContext; [key: string]: any }, next: () => Promise<any>) => {
      const session = this.config.useSession && ctx[this.config.sessionName]
      const languageCode =
        (session && session.__language_code) || (ctx.from && ctx.from.language_code)
      ctx.i18n = this.createContext(languageCode, {
        from: ctx.from,
        chat: ctx.chat
      })
      return next().then(rs => {
        if (session) {
          session.__language_code = ctx.i18n.locale()
        }
        return rs
      })
    }
  }

  createContext(languageCode: string, templateData: { [key: string]: any }) {
    return new I18nContext(this.repository, languageCode, templateData, this.config)
  }

  t(languageCode: string, resourceKey: string, templateData: object) {
    return this.createContext(languageCode, templateData).t(resourceKey)
  }
}

function compileTemplates(root: any) {
  Object.keys(root).forEach(key => {
    if (!root[key]) {
      return
    }
    if (Array.isArray(root[key])) {
      root[key] = root[key].map(compileTemplates)
    }
    if (typeof root[key] === 'object') {
      root[key] = compileTemplates(root[key])
    }
    if (typeof root[key] === 'string') {
      root[key] = compile(root[key])
    }
  })
  return root
}

import { plural, pluralize } from './pluralize'

export interface Config {
  directory?: string
  useSession?: boolean
  sessionName: string
  allowMissing?: boolean
  defaultLanguage: string
}

export class I18nContext {
  defaultContext: object
  shortLanguageCode?: string

  constructor(
    private repository: any,
    public languageCode: string,
    templateData: object,
    public config: Config
  ) {
    this.defaultContext = templateData
    this.config = config
    this.locale(languageCode || this.config.defaultLanguage)
  }

  locale(languageCode?: string) {
    if (!languageCode) {
      return this.languageCode
    }

    const code = languageCode.toLowerCase()
    const shortCode = code.split('-')[0]

    if (!this.repository[code] && !this.repository[shortCode]) {
      this.languageCode = this.config.defaultLanguage
      this.shortLanguageCode = this.languageCode.split('-')[0]
      return
    }

    this.languageCode = code
    this.shortLanguageCode = shortCode
  }

  getTemplate(languageCode: string, resourceKey = '') {
    return resourceKey
      .split('.')
      .reduce((acc, key) => acc && acc[key], this.repository[languageCode])
  }

  t(resourceKey: string, context?: object) {
    let template =
      this.getTemplate(this.languageCode, resourceKey) ||
      this.getTemplate(this.shortLanguageCode!, resourceKey)
    if (!template) {
      if (!this.config.allowMissing) {
        throw new Error(`telegraf-i18n: '${this.languageCode}.${resourceKey}' not found`)
      }
      template = () => resourceKey
    }
    return template(
      Object.assign(
        {
          pluralize: pluralize(this.shortLanguageCode!),
          plural: plural(this.shortLanguageCode!)
        },
        this.defaultContext,
        context
      )
    )
  }
}

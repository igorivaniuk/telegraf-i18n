import { I18nContext } from './context'
import { I18n } from './i18n'
import { pluralize } from './pluralize'

function match(resourceKey: string, templateData: object) {
  return (text: string, ctx: { i18n: I18nContext }) =>
    text && ctx && ctx.i18n && text === ctx.i18n.t(resourceKey, templateData) ? [text] : null
}

function reply(resourceKey: string, extra: any) {
  return ({ reply, i18n }: { reply: Function; i18n: I18nContext }) =>
    reply(i18n.t(resourceKey), extra)
}

export { I18n, reply, match, pluralize, I18nContext }

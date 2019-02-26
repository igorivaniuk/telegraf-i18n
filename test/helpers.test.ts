import * as path from 'path'
import { I18n, I18nContext, match, reply } from '../src'

describe('Helpers', () => {
  let i18n: I18n
  let context: I18nContext
  beforeAll(() => {
    i18n = new I18n({
      defaultLanguage: 'ru',
      allowMissing: true,
      directory: path.resolve(__dirname, 'locales'),
      sessionName: 'session'
    })
    context = i18n.createContext('ru', {})
  })

  it('reply', () => {
    let resourceKey = 'button.help'
    let extra = {}
    let fn = reply(resourceKey, extra)
    let spy = jest.fn()
    fn({ i18n: context, reply: spy })
    expect(spy).toBeCalled()
    expect(spy).toBeCalledWith(context.t(resourceKey), extra)
  })

  it('match', () => {
    let resourceKey = 'button.help'
    let templateData = {}
    let fn = match(resourceKey, templateData)
    expect(fn('Помощь', { i18n: context })).toEqual(['Помощь'])
    expect(fn('any', { i18n: context })).toEqual(null)
  })
})

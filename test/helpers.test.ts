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

  it('reply', async () => {
    let resourceKey = 'button.help'
    let extra = {}
    let fn = reply(resourceKey, extra)
    let spy = jest.fn()
    await fn({ i18n: context, reply: spy } as any)
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

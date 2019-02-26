/**
 * Dummy test
 */
import * as path from 'path'
import { I18n } from '../src'

let templateData = { from: { id: 1234 }, chat: {} }

describe('I18n', () => {
  let i18n: I18n
  beforeAll(() => {
    i18n = new I18n({
      defaultLanguage: 'ru',
      allowMissing: true,
      directory: path.resolve(__dirname, 'locales'),
      sessionName: 'session'
    })
  })

  it('create ', () => {
    expect(i18n).toBeInstanceOf(I18n)
    expect(i18n.repository).toMatchSnapshot()
  })

  it('t ru', () => {
    expect(i18n.t('ru', 'command.start', templateData)).toBe('Привет 1234\n')
    expect(i18n.t('ru', 'button.settings', templateData)).toBe('Настройки')
    expect(i18n.t('ru', 'button.help', templateData)).toBe('Помощь')
  })

  it('t en', () => {
    expect(i18n.t('en', 'command.start', templateData)).toBe('Hello 1234\n')
    expect(i18n.t('en', 'button.settings', templateData)).toBe('Settings')
    expect(i18n.t('en', 'button.help', templateData)).toBe('Help')
  })

  it('t default lang', () => {
    expect(i18n.t('ru', 'command.start', templateData)).toBe('Привет 1234\n')
    expect(i18n.t('ru', 'button.settings', templateData)).toBe('Настройки')
    expect(i18n.t('ru', 'button.help', templateData)).toBe('Помощь')
  })

  it('plural en', () => {
    expect(
      i18n.t('en', 'plural', {
        ...templateData,
        count: 1
      })
    ).toBe('Found 1 user\n')

    expect(
      i18n.t('en', 'plural', {
        ...templateData,
        count: 2
      })
    ).toBe('Found 2 users\n')
  })

  it('plural ru', () => {
    expect(
      i18n.t('ru', 'plural', {
        ...templateData,
        count: 1
      })
    ).toBe('Найден 1 пользователь\n')

    expect(
      i18n.t('ru', 'plural', {
        ...templateData,
        count: 2
      })
    ).toBe('Найдено 2 пользователя\n')

    expect(
      i18n.t('ru', 'plural', {
        ...templateData,
        count: 3
      })
    ).toBe('Найдено 3 пользователя\n')
  })

  it('plural default lang', () => {
    expect(
      i18n.t('kkk', 'plural', {
        ...templateData,
        count: 1
      })
    ).toBe('Найден 1 пользователь\n')

    expect(
      i18n.t('kkk', 'plural', {
        ...templateData,
        count: 2
      })
    ).toBe('Найдено 2 пользователя\n')

    expect(
      i18n.t('kkk', 'plural', {
        ...templateData,
        count: 3
      })
    ).toBe('Найдено 3 пользователя\n')
  })

  it('resetLocale', () => {
    i18n.resetLocale('ru')
    expect(i18n.repository).toMatchSnapshot()

    i18n.resetLocale()
    expect(i18n.repository).toMatchSnapshot()
  })
})

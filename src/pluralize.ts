// https://developer.mozilla.org/en-US/docs/Mozilla/Localization/Localization_and_Plurals

const pluralRules: any = {
  english: (n: number) => (n !== 1 ? 1 : 0),
  french: (n: number) => (n > 1 ? 1 : 0),
  russian: (n: number) => {
    if (n % 10 === 1 && n % 100 !== 11) {
      return 0
    }
    return n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
  },
  czech: (n: number) => {
    if (n === 1) {
      return 0
    }
    return n >= 2 && n <= 4 ? 1 : 2
  },
  polish: (n: number) => {
    if (n === 1) {
      return 0
    }
    return n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2
  },
  icelandic: (n: number) => (n % 10 !== 1 || n % 100 === 11 ? 1 : 0),
  chinese: () => 0,
  arabic: (n: number) => {
    if (n >= 0 && n < 3) {
      return n
    }
    if (n % 100 <= 10) {
      return 3
    }
    if (n >= 11 && n % 100 <= 99) {
      return 4
    }
    return 5
  }
}

const mapping: { [key: string]: string[] } = {
  english: ['da', 'de', 'en', 'es', 'fi', 'el', 'he', 'hu', 'it', 'nl', 'no', 'pt', 'sv', 'br'],
  chinese: ['fa', 'id', 'ja', 'ko', 'lo', 'ms', 'th', 'tr', 'zh', 'jp'],
  french: ['fr', 'tl', 'pt-br'],
  russian: ['hr', 'ru', 'uk', 'uz'],
  czech: ['cs', 'sk'],
  icelandic: ['is'],
  polish: ['pl'],
  arabic: ['ar']
}

export function pluralize(languageCode: string) {
  const language = languageCode.split('-')[0].toLowerCase()
  let key = Object.keys(mapping).find(key => mapping[key].includes(language))
  if (!key) {
    console.warn(`i18n::Pluralize: Unsupported language ${languageCode}`)
    key = 'english'
  }
  return (count: number, ...forms: string[]) =>
    `${count} ${forms[pluralRules[key as string](count)]}`
}

export function plural(languageCode: string) {
  const language = languageCode.split('-')[0].toLowerCase()
  let key = Object.keys(mapping).find(key => mapping[key].includes(language))
  if (!key) {
    console.warn(`i18n::Pluralize: Unsupported language ${languageCode}`)
    key = 'english'
  }
  return (count: number, ...forms: string[]) => `${forms[pluralRules[key as string](count)]}`
}

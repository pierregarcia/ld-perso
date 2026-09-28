export type Language = 'fr' | 'en'

const translations = {
  fr: {
    title: 'LEXIDATA', subtitle: 'Le boîtier de réponses, partout avec toi',
    group: 'Groupe', series: 'Série', select: 'Choisir',
    chooseActivity: 'Choisis un groupe et une série pour commencer.', answers: 'Tes réponses',
    question: 'Question', answer: 'Réponse', reset: 'Recommencer',
    soundOn: 'Son activé', soundOff: 'Son coupé', success: 'Bravo !',
    successDetail: 'Toutes tes réponses sont correctes.', switchLanguage: 'Passer en anglais',
    updateReady: 'Une nouvelle version est disponible.', update: 'Mettre à jour',
  },
  en: {
    title: 'LEXIDATA', subtitle: 'Your answer board, wherever you go',
    group: 'Group', series: 'Series', select: 'Choose',
    chooseActivity: 'Choose a group and a series to begin.', answers: 'Your answers',
    question: 'Question', answer: 'Answer', reset: 'Reset',
    soundOn: 'Sound on', soundOff: 'Sound off', success: 'Well done!',
    successDetail: 'All your answers are correct.', switchLanguage: 'Switch to French',
    updateReady: 'A new version is available.', update: 'Update',
  },
} as const

export type TranslationKey = keyof typeof translations.fr

export function translate(language: Language, key: TranslationKey): string {
  return translations[language][key]
}
export const MANDATORY_NAMES = ['Orang Tua', 'Tabungan Bulanan', 'Investasi']
export const isMandatory = (cat) => MANDATORY_NAMES.includes(cat.name)

export const MANDATORY_INCOME_NAMES = ['Gaji']
export const isMandatoryIncome = (cat) => MANDATORY_INCOME_NAMES.includes(cat.name)

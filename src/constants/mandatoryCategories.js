export const isMandatory = (cat) => cat.is_mandatory === true

export const isSavings = (cat) =>
  cat.category_type === 'savings'

export const MANDATORY_INCOME_NAMES = ['Gaji', 'Pemasukan Bulanan']
export const isMandatoryIncome = (cat) =>
  cat.category_type === 'income' || MANDATORY_INCOME_NAMES.includes(cat.name)

export const isWajib = (cat) =>
  cat.category_type === 'wajib' ||
  (!cat.category_type && cat.is_mandatory && !isMandatoryIncome(cat) && !isSavings(cat))

export const isRutin = (cat) =>
  cat.category_type === 'rutin' ||
  (!cat.category_type && cat.is_monthly && !cat.is_mandatory)

export const isTambahan = (cat) =>
  cat.category_type === 'tambahan' ||
  (!cat.category_type && !cat.is_mandatory && !cat.is_monthly && !isMandatoryIncome(cat) && !isSavings(cat))

// Categories that cannot be deleted
export const PROTECTED_NAMES = ['Gaji', 'Pemasukan Bulanan', 'Tabungan Bulanan', 'Dana Darurat']
export const isProtected = (cat) =>
  PROTECTED_NAMES.includes(cat.name)

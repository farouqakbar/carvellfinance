export const isMandatory = (cat) => cat.is_mandatory === true

export const MANDATORY_INCOME_NAMES = ['Pemasukan Bulanan']
export const isMandatoryIncome = (cat) => MANDATORY_INCOME_NAMES.includes(cat.name)

// Kategori yang tidak bisa dihapus — selalu ada di semua bulan
export const PROTECTED_NAMES = ['Tabungan Bulanan', 'Pemasukan Bulanan']
export const isProtected = (cat) => PROTECTED_NAMES.includes(cat.name)

// Pengeluaran wajib: DB-based (is_mandatory = true), user bisa tambah/hapus di Settings
export const isMandatory = (cat) => cat.is_mandatory === true

// Pemasukan wajib: selalu Gaji
export const MANDATORY_INCOME_NAMES = ['Gaji']
export const isMandatoryIncome = (cat) => MANDATORY_INCOME_NAMES.includes(cat.name)

// Utility untuk hash dan verify password
// Gunakan bcryptjs untuk hashing yang aman

export async function hashPassword(password) {
  // Simple implementation - untuk production gunakan bcryptjs library
  // Installation: npm install bcryptjs
  
  // Untuk now, gunakan crypto yang built-in browser (tidak ideal tapi cukup)
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
  return hashHex
}

export async function verifyPassword(password, hash) {
  const passwordHash = await hashPassword(password)
  return passwordHash === hash
}

// Untuk production, lebih baik gunakan:
// import bcrypt from 'bcryptjs'
// export async function hashPassword(password) {
//   return await bcrypt.hash(password, 10)
// }
// export async function verifyPassword(password, hash) {
//   return await bcrypt.compare(password, hash)
// }

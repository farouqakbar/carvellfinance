import { createContext, useContext, useState } from 'react'

const Ctx = createContext(null)

export function PageHeaderProvider({ children }) {
  const [header, setHeader] = useState(null)
  return <Ctx.Provider value={{ header, setHeader }}>{children}</Ctx.Provider>
}

export function usePageHeader() {
  return useContext(Ctx)
}

import { QuickitThemeContext } from './quickit-theme-context'

export function QuickitProvider({ children, theme = 'light' }) {
  return (
    <QuickitThemeContext.Provider value={theme}>
      {children}
    </QuickitThemeContext.Provider>
  )
}

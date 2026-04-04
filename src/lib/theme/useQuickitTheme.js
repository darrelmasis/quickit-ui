import { useContext } from 'react'
import { QuickitThemeContext } from './quickit-theme-context'

export function useQuickitTheme() {
  return useContext(QuickitThemeContext)
}

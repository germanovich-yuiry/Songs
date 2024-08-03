import type { FC, ReactNode } from "react"
import { useState, useEffect, useCallback } from "react"
import { ThemeContext, Theme } from "../lib/ThemeContext"

const dark = {
  backgroundColor: "black",
}
const light = {
  backgroundColor: "white",
}

type ThemeProviderProps = {
  children: ReactNode
}
const initialTheme = (): Theme => {
  const cashTheme = localStorage.getItem("Theme")
  return cashTheme ? (cashTheme as Theme) : Theme.LIGHT
}

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(initialTheme)

  const toggleTheme = useCallback(() => {
    console.log(theme)
    const updateTheme = theme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT
    setTheme(updateTheme)
    localStorage.setItem("Theme", updateTheme)
  }, [theme])

  useEffect(() => {
    const cashTheme = localStorage.getItem("Theme")
    if (cashTheme) {
      setTheme(cashTheme as Theme)
    }
  }, [])

  const contextValue = {
    theme,
    toggleTheme,
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      <div>{children}</div>
      {/* <div style={theme === Theme.DARK ? dark : light}>{children}</div> */}
    </ThemeContext.Provider>
  )
}

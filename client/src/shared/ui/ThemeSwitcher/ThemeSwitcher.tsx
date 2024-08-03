import type { FC } from "react"
import { Theme } from "../../../app/providers/ThemeProvide"
import { useTheme } from "../../../app/providers/ThemeProvide"

import styles from "./ThemeSwitcher.module.scss"

const ThemeSwitcher: FC = () => {
  const { toggleTheme, theme } = useTheme()
  const isChecked = () => {
    return theme === Theme.DARK
  }
  return (
    <div className={`${styles["container"]}`}>
      <input
        onChange={() => toggleTheme()}
        type={"checkbox"}
        className={styles["visually-hidden"]}
        id={"switcher"}
        checked={isChecked()}
      />
      <label
        className={styles.switcher}
        htmlFor={"switcher"}
        data-testid={"switcher"}
      ></label>
    </div>
  )
}

export default ThemeSwitcher

import type React from "react"
import ThemeSwitcher from "../../shared/ui/ThemeSwitcher/ThemeSwitcher"
import styles from "./SignUpLayout.module.scss"

interface SignUpLayoutProps {
  children: React.ReactElement
}

export const SignUpPageLayout: React.FC<SignUpLayoutProps> = ({ children }) => {
  return (
    <div className={styles["container-margin"]}>
      <div className={styles["container-switcher"]}>
        <ThemeSwitcher />
      </div>
      {children}
    </div>
  )
}

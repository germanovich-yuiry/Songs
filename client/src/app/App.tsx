import { Outlet } from "react-router-dom"
import type { FC } from "react"
import type { IAppProps } from "../types/App.type"

import { useTheme } from "../app/providers/ThemeProvide"

import styled from "styled-components"
import { useSelector } from "react-redux"
import { selectToken } from "../services/RegistrationAPI/registrationSlice"

const StyledApp = styled.div<{ light: boolean }>`
  text-align: center;
  max-width: 1200px;
  min-width: 320px;
  min-height: 100vh;
  overflow-x: hidden;
  margin: 0 auto;
  background-color: ${props =>
    props.light ? "rgba(7, 43, 86, 0.867)" : "rgba(255,165,0,7)"};
`

const App: FC<IAppProps> = () => {
  const token = useSelector(selectToken)
  const logout = () => {
    fetch("http://localhost:7000/api/user/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ token }),
    })
      .then(res => res.json())
      .then(res => console.log(res))
  }

  const { theme } = useTheme()
  return (
    <StyledApp light={theme === "light"}>
      <Outlet />
    </StyledApp>
  )
}

export default App

import type { FC } from "react"
import styled from "styled-components"

import { Link } from "react-router-dom"

import { useTheme } from "../app/providers/ThemeProvide"

const StyledLink = styled(Link)<{
  light: boolean
  children: string
  to: string
}>`
  text-decoration: none;
  color: ${props => (!props.light ? "black" : "white")};
`

const UserLink: FC<{ children: string; to: string }> = ({ children, to }) => {
  const { theme } = useTheme()

  return (
    <StyledLink to={to} light={theme === "light"}>
      {children}
    </StyledLink>
  )
}

export default UserLink

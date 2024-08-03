import { Link } from "react-router-dom"
import { useTheme } from "../app/providers/ThemeProvide"
import styled from "styled-components"

const StyledLink = styled(Link)<{ light: boolean; to: string }>`
  color: ${props => (!props.light ? "black" : "white")};
  font-size: x-large;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  margin: 10px;
  &:hover,
  &:focus {
    color: ${props => (!props.light ? "white" : "black")}
  }
  &:active {
    color: red;
  }
}
`

export const CustomLink = ({ to, children }) => {
  const { theme } = useTheme()

  return (
    <StyledLink light={theme === "light"} to={to}>
      {children}
    </StyledLink>
  )
}

export default CustomLink

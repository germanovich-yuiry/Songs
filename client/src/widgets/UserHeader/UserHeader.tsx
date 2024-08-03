import UserLink from "../../shared/UserLink"
import styled from "styled-components"
import ThemeSwitcher from "../../shared/ui/ThemeSwitcher/ThemeSwitcher"
import { useTheme } from "../../app/providers/ThemeProvide"

const Header = styled.header<{ light: boolean }>`
  width: 100%;
  height: 80px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;

  padding: 20px;

  color: ${props => (props.light ? "white" : "black")};
`

const UserHeader = () => {
  const { theme } = useTheme()
  return (
    <Header light={theme === "light"}>
      <h1>SongsApp</h1>
      <UserLink to="/sign-out">Выйти</UserLink>
      <UserLink to="/songs">Все композиции</UserLink>
      <ThemeSwitcher />
    </Header>
  )
}

export default UserHeader

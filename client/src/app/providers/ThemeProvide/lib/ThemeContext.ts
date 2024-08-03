import { createContext } from "react";

export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

type ThemeContextTupe = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextTupe>({
  theme: Theme.LIGHT,
  toggleTheme: () => {},
});

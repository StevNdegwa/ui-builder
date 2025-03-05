import { FC, PropsWithChildren } from "react";
import { ThemeProvider as TP } from "styled-components";
import theme from "./theme";

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return <TP theme={theme}>{children}</TP>;
};

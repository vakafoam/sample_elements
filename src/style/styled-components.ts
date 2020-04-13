import * as styledComponents from "styled-components";

// import { ThemeInterface } from "style/theme";
// import { screenSizes } from "style/breakpoints";

const {
  default: styled,
  css,
  ThemeProvider,
  createGlobalStyle,
  keyframes,
} = (styledComponents as unknown) as styledComponents.ThemedStyledComponentsModule<{}>;

export type ThemedAndStyled<P> = P & styledComponents.ThemeProps<any>;

export { css, createGlobalStyle, ThemeProvider, keyframes };

export default styled;

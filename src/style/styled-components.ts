import * as styledComponents from "styled-components";

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

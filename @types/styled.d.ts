import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    primary1: HexColor;
    primary2: HexColor;
    primary3: HexColor;
    primary4: HexColor;
    primary5: HexColor;

    grey1: HexColor;
    grey2: HexColor;
    grey3: HexColor;

    bg1: HexColor;
    bg2: HexColor;
    bg3: HexColor;

    red1: HexColor;
    red2: HexColor;
    red3: HexColor;

    blue: HexColor;
  }
}

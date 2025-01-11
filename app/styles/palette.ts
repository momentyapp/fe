import type { DefaultTheme } from "styled-components";

const darkPalette: DefaultTheme = {
  primary1: "#B2DFD7",
  primary2: "#4DB6A4",
  primary3: "#009680",
  primary4: "#007964",
  primary5: "#004D3A",

  grey1: "#C2C2C2",
  grey2: "#979797",
  grey3: "#606060",

  bg1: "#262626",
  bg2: "#434343",
  bg3: "#555555",

  red1: "#DC756E",
  red2: "#E74C3C",
  red3: "#C7392A",
};

const lightPalette: DefaultTheme = {
  primary1: "#004D3A",
  primary2: "#007964",
  primary3: "#009680",
  primary4: "#4DB6A4",
  primary5: "#B2DFD7",

  grey1: "#606060",
  grey2: "#979797",
  grey3: "#C2C2C2",

  bg1: "#FFFFFF",
  bg2: "#F5F5F5",
  bg3: "#F0F0F0",

  red1: "#C7392A",
  red2: "#E74C3C",
  red3: "#DC756E",
};

const palette = {
  dark: darkPalette,
  light: lightPalette,
};

export default palette;

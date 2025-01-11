export interface Palette {
  primary1: string;
  primary2: string;
  primary3: string;
  primary4: string;
  primary5: string;

  grey1: string;
  grey2: string;
  grey3: string;

  bg1: string;
  bg2: string;
  bg3: string;

  red1: string;
  red2: string;
  red3: string;
}

const darkPalette: Palette = {
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

const lightPalette: Palette = {
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

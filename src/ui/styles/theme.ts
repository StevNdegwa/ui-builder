const colorSchemes = {
  palette: {
    primary: {
      "50": "#A17EF1",
      "100": "#8F6DEA",
      "200": "#7D5CE3",
      "300": "#6B4BDC",
      "400": "#593AD5",
      "500": "#4729CE",
      "600": "#3F24B5",
      "700": "#361F9C",
      "800": "#2E1A83",
      "900": "#26156A",
    },
    secondary: {
      "50": "#D4E788",
      "100": "#C2E177",
      "200": "#B0D966",
      "300": "#9ECF55",
      "400": "#8CC644",
      "500": "#7ABD33",
      "600": "#6DB42D",
      "700": "#60AB27",
      "800": "#53A221",
      "900": "#46991B",
    },
    gray: {
      "50": "#F2F2F2",
      "100": "#E0E0E0",
      "200": "#CECECE",
      "300": "#BCBCBC",
      "400": "#AAAAAA",
      "500": "#989898",
      "600": "#868686",
      "700": "#747474",
      "800": "#626262",
      "900": "#505050",
    },
  },
  bg: "white",
  textOnLight: "#0f0f0f",
  textOnDark: "#ffffff",
};

const breakpoints = {
  xs: 0,
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1240,
  xxl: 1440,
  xxxl: 1920,
};

const fonts = {
  family: "sans-serif",
  size: {
    title: {
      xs: "14px",
      sm: "16px",
      md: "18px",
      lg: "24px",
      xl: "32px",
      xxl: "48px",
      xxxl: "64px",
    },
    body: {
      xs: "12px",
      sm: "14px",
      md: "16px",
      lg: "18px",
      xl: "20px",
      xxl: "24px",
      xxxl: "32px",
    },
  },
  weight: {
    body: {
      lighter: 300,
      light: 400,
      regular: 500,
      medium: 600,
      bold: 800,
    },
    title: {
      lighter: 400,
      light: 500,
      regular: 600,
      medium: 800,
      bold: "bold",
    },
  },
};

export const spacings = {
  padding: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
  },
  margin: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
  },
};

const borderRadius = {
  xs: "2px",
  sm: "4px",
  md: "8px",
  lg: "12px",
  xl: "16px",
};

const layers = {
  modal: 10,
  notification: 100,
};

const theme = {
  fonts,
  colorSchemes,
  breakpoints,
  borderRadius,
  spacings,
  layers,
};

export const ThemeType = typeof theme;

export default theme;

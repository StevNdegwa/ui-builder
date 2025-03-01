const theme = {
  "fontFamily": {
    body: "sans-serif",
  },
  "colorSchemes": {
    "light": {
      "palette": {
        "primary":{

        }
      },
      "white": "#ffffff",
      "dark": "#282C35",
      "text": "#f2f2f2",
      "bg":"rgb(255,255,255)"
    }
  },
  breakpoints: {
    keys: ["xs", "sm", "md", "lg", "xl"],
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1024,
      xl: 1240,
    },
  },      
}

export const ThemeType = typeof theme

export default theme
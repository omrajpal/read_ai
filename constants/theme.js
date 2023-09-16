const COLORS = {
  primary: "#1b4965", // text
  secondary: "#bee9e8", // notch
  tertiary: "#62b6cb", // camera button

  gray: "#83829A",
  gray2: "#C1C0C8",

  white: "#F3F4F8",
  lightWhite: "#FAFAFC", // background

  // light blue bee9e8
  // aqua blue 62b6cb
  // dark blue 1b4965

  // primary: "#1b4965",
  // secondary: "#bee9e8", // #444262
  // tertiary: "#62b6cb", // #FF7754

  // gray: "#83829A",
  // gray2: "#C1C0C8",

  // white: "#F3F4F8",
  // lightWhite: "#FAFAFC",
};

const FONT = {
  regular: "DMRegular",
  medium: "DMMedium",
  bold: "DMBold",
};

const SIZES = {
  xSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  xLarge: 24,
  xxLarge: 32,
};

const SHADOWS = {
  small: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 5.84,
    elevation: 5,
  },
};

export { COLORS, FONT, SIZES, SHADOWS };

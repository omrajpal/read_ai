const COLORS = {
  primary: "#1b4965", // text
  secondary: "#FFFFFF", // notch
  tertiary: "#bfe0f2", // camera button

  gray: "#83829A",
  gray2: "#C1C0C8",

  white: "#F3F4F8",
  lightWhite: "#FFFFFF", // background
  borderColor: "#62b6cb", // Add border color

  // light blue bee9e8
  // aqua blue 62b6cb
  // dark blue 1b4965
  // lightWhite FAFAFC

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
  medium: 18,
  large: 25,
  xLarge: 30,
  xxLarge: 42,
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

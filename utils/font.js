import * as Font from "expo-font";

export const loadFonts = async () => {
  await Font.loadAsync({
    Italic: require("../assets/fonts/Roboto-LightItalic.ttf"),
    Regular: require("../assets/fonts/BricolageGrotesque-Regular.ttf"),
    Medium: require("../assets/fonts/BricolageGrotesque-Medium.ttf"),
    SemiBold: require("../assets/fonts/BricolageGrotesque-SemiBold.ttf"),
    Bold: require("../assets/fonts/BricolageGrotesque-Bold.ttf"),
  });
};

export const fonts = {
  Italic: "Italic",
  regular: "Regular",
  medium: "Medium",
  semiBold: "SemiBold",
  bold: "Bold",
};

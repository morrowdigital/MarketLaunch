import { createTamagui, createFont, variableToString } from 'tamagui';
import { shorthands } from '@tamagui/shorthands';
import {
  themes as tamaguiThemes,
  color as tamaguiColor,
  radius,
  zIndex,
  space,
  size,
} from '@tamagui/themes';
import { createMedia } from '@tamagui/react-native-media-driver';
import { createTokens } from '@tamagui/web';
import customThemeColors from './custom-theme-colors';
import { animations } from './animations';

const bodyFont = createFont({
  family: 'DM Sans, sans-serif',
  size: {
    true: 14, // for some strange reason the DarkButton element complains when this line is missing
    4: 10,
    7: 14,
    9: 20,
    10: 30,
  },
  lineHeight: {
    4: 10,
    7: 18,
    9: 22,
    10: 30,
  },
  transform: {
    7: 'none',
  },
  weight: {
    7: '400',
    9: '700',
    10: '700',
  },
  color: {
    6: '$colorFocus',
    7: '$color',
  },
  letterSpacing: {
    4: 0,
    5: 2,
    6: 1,
    7: 0,
    8: -1,
    9: 0,
    10: 0,
    12: -4,
    14: -5,
    15: -6,
  },
  face: {
    700: { normal: 'DMSansBold' },
  },
});

// const bodyFont = createFont(
//   {
//     face: {
//       700: { normal: 'DMSansBold' },
//     },
//   },
// )

const tokens = createTokens({
  color: {
    ...tamaguiColor,
    // Enter your custom colors here
    ...customThemeColors.colors,
    statusGreenFg: customThemeColors.statusColors.green.font,
    statusGreenBg: customThemeColors.statusColors.green.background,
    statusRedFg: customThemeColors.statusColors.red.font,
    statusRedBg: customThemeColors.statusColors.red.background,
    statusYellowFg: customThemeColors.statusColors.yellow.font,
    statusYellowBg: customThemeColors.statusColors.yellow.background,
    statusLightGreenFg: customThemeColors.statusColors.lightgreen.font,
    statusLightGreenBg: customThemeColors.statusColors.lightgreen.background,
  },
  radius,
  zIndex,
  space,
  size,
});

const allThemes = {
  light: {
    ...tamaguiThemes.light,
    color: variableToString(tokens.color.colorA),
    background: variableToString(tokens.color.pageBg),
    placeholderColor: variableToString(tokens.color.faint),
  },
};

export default createTamagui({
  animations,
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  shorthands,
  fonts: {
    heading: bodyFont,
    body: bodyFont,
  },
  themes: allThemes,
  tokens,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

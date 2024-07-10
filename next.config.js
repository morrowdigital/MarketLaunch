/** @type {import('next').NextConfig} */
const { withTamagui } = require('@tamagui/next-plugin');
const { join } = require('path');

process.env.IGNORE_TS_CONFIG_PATHS = 'true';
process.env.TAMAGUI_TARGET = 'web';
process.env.TAMAGUI_DISABLE_WARN_DYNAMIC_LOAD = '1';

const boolVals = {
  true: true,
  false: false,
};

const disableExtraction =
  boolVals[process.env.DISABLE_EXTRACTION] ?? process.env.NODE_ENV === 'development';

const plugins = [
  withTamagui({
    config: './src/tamagui-conf/tamagui.config.ts',
    components: ['tamagui'],
    importsWhitelist: ['constants.js', 'colors.js'],
    logTimings: true,
    disableExtraction,
    // experiment - reduced bundle size react-native-web
    useReactNativeWebLite: false,
    shouldExtract: (path) => {
      if (path.includes(join('packages', 'app'))) {
        return true;
      }
    },
  }),
];

module.exports = function () {
  /** @type {import('next').NextConfig} */
  let config = {
    modularizeImports: {
      '@tamagui/lucide-icons': {
        transform: `@tamagui/lucide-icons/dist/esm/icons/{{kebabCase member}}`,
        skipDefaultConversion: true,
      },
    },
    transpilePackages: ['solito', 'react-native-web'],
    pageExtensions: ['page.tsx', 'endpoint.ts'],
    experimental: {
      // optimizeCss: true,
      scrollRestoration: true,
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'cdn.schema.io',
        },
        {
          protocol: 'https',
          hostname: 'cdn.swell.store',
        },
      ],
    },
  };

  for (const plugin of plugins) {
    config = {
      ...config,
      ...plugin(config),
    };
  }

  return config;
};

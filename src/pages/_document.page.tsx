import NextDocument, { Head, Html, NextScript, Main } from 'next/document';

import React, { Children } from 'react';
import { AppRegistry } from 'react-native';

import Tamagui from '../tamagui-conf/tamagui.config';

export default class Document extends NextDocument {
  static async getInitialProps({ renderPage }: any) {
    AppRegistry.registerComponent('Main', () => Main);
    const page = await renderPage();

    // @ts-expect-error getApplication doesn't exist in types?
    const { getStyleElement } = AppRegistry.getApplication('Main');

    /**
     * Note: be sure to keep tamagui styles after react-native-web styles like it is here!
     * So Tamagui styles can override the react-native-web styles.
     */
    const styles = [
      getStyleElement(),
      <style key="tamagui-css" dangerouslySetInnerHTML={{ __html: Tamagui.getCSS() }} />,
    ];

    return { ...page, styles: Children.toArray(styles) };
  }

  render() {
    return (
      <Html>
        <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Head>
        {/*TODO: this color should come from theme*/}
        <body style={{ backgroundColor: 'white' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

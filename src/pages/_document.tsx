import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render() {
    return (
      <Html lang="pt-br">
        <Head>
          <meta charSet="utf-8"/>

          <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700;800;900&family=Russo+One&display=swap" rel="stylesheet"></link>

          <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NRGSWXG"
      height="0" width="0"></iframe></noscript>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCxkR94NQPNxvyNdl5itMziJtc8edBJdkc&libraries=places"></script>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

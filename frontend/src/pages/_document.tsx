import Document, { Head, Html, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@mui/styles';
import * as React from 'react';

// eslint-disable-next-line import/exports-last, padded-blocks
export default class MyDocument extends Document {
    render(): JSX.Element {
        return (
            <Html lang='en'>
                <Head>
                    <link rel='preconnect' href='https://fonts.googleapis.com' />
                    <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous' />
                    <link
                        href='https://fonts.googleapis.com/css2?family=Lexend:wght@200;300;400;500;600;700;800&display=swap'
                        rel='stylesheet'
                    />
                    <link rel='icon' href='/favicon.ico' />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
        // eslint-disable-next-line padded-blocks
    }
}

MyDocument.getInitialProps = async (ctx) => {
    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: (App) => (props) => sheets.collect(<App {...props} />)
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()]
    };
};

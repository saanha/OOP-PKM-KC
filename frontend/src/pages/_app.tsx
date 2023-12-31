import { CacheProvider } from '@emotion/react';
import type { EmotionCache } from '@emotion/utils';
import { CssBaseline, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect } from 'react';
import type { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import createEmotionCache from '@/styles/createEmotionCache';
import { injectStyle } from 'react-toastify/dist/inject-style';
import { ToastContainer } from 'react-toastify';
import theme from '@/styles/theme';
import type { NextPage } from 'next';
// eslint-disable-next-line import/extensions
import '@/styles/globals.css';
import 'react-datepicker/dist/react-datepicker.css';
import { DashboardContextProvider } from '@/contexts/DashboardContext/DashboardContext';

type Page<P = unknown> = NextPage<P> & {
    getLayout?: (_page: ReactNode) => ReactNode;
};
interface MyAppProps extends AppProps {
    emotionCache?: EmotionCache;
    Component: Page;
}

const clientSideEmotionCache: EmotionCache = createEmotionCache();

const MyApp: FunctionComponent<MyAppProps> = (props: PropsWithChildren<MyAppProps>) => {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    const getLayout = Component.getLayout ?? ((page: ReactNode) => page);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            injectStyle();
        }
    }, []);

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <DashboardContextProvider>
                    {getLayout(
                        <>
                            <Head>
                                <title>Foodtura</title>
                                <meta name='description' content='Foodtura' />
                                <meta name='viewport' content='initial-scale=1, width=device-width' />
                                <meta property='og:type' content='website' />
                                <meta property='og:title' content='Foodtura' />
                                <meta property='og:description' content='Foodtura' />
                            </Head>
                            <CssBaseline />
                            <Component {...pageProps} />
                            <ToastContainer
                                position='top-right'
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={true}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                            />
                        </>
                    )}
                </DashboardContextProvider>
            </ThemeProvider>
        </CacheProvider>
    );
};

export default MyApp;

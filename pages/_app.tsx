import React, { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { appWithTranslation } from 'next-i18next'
import '@/styles/global-style.css'
import '@/styles/base.scss'
import { Provider } from 'react-redux'
import { store } from '@/store'
import { AppProps } from 'next/app'
import Layout from '@/layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

type NextPageWithLayout = NextPage & {
    // eslint-disable-next-line no-unused-vars
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: 0, refetchOnWindowFocus: false } },
    })
    const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
    return (
        <QueryClientProvider client={queryClient}>
            <Provider store={store}>
                {getLayout(<Component {...pageProps} />)}
            </Provider>
        </QueryClientProvider>
    )
}

export default appWithTranslation(App)

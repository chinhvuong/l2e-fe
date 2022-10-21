import React, { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { appWithTranslation } from 'next-i18next'
import '@/styles/global-style.css'
import '@/styles/base.scss'
import StateProvider from 'state'
import { store } from '@/store'
import { AppProps } from 'next/app'
import Layout from '@/layout'
type NextPageWithLayout = NextPage & {
    // eslint-disable-next-line no-unused-vars
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)
    return (
        <StateProvider>{getLayout(<Component {...pageProps} />)}</StateProvider>
    )
}

export default appWithTranslation(App)

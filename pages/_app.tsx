import Layout from '@/layout'
import WalletLogic from '@/layout/main-layout/header/wallet-logic'
import { store } from '@/store'
import '@/styles/base.scss'
import '@/styles/global-style.css'
import WagmiProvider from '@/wallet/provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { ReactElement, ReactNode } from 'react'
import { Provider } from 'react-redux'
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
            <WagmiProvider>
                <Provider store={store}>
                    <WalletLogic />
                    {getLayout(<Component {...pageProps} />)}
                </Provider>
            </WagmiProvider>
        </QueryClientProvider>
    )
}

export default App

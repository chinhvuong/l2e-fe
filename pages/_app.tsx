import React, { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next'
import { appWithTranslation } from 'next-i18next'
import '@/styles/global-style.css'
import '@/styles/base.scss'
import { eth } from '@/hooks/useEth' // Eth state provider
import { Provider } from 'react-redux'
import { store } from '@/store'
import { AppProps } from 'next/app'
import Layout from '@/layout'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {
    WagmiConfig,
    createClient,
    configureChains,
    chain,
    defaultChains,
  } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
import { alchemyProvider } from 'wagmi/providers/alchemy'
  // Configure chains & providers with the Alchemy provider.
  // Two popular providers are Alchemy (alchemy.com) and Infura (infura.io)
  const { chains, provider, webSocketProvider } = configureChains(defaultChains, [
    alchemyProvider({ apiKey: 'WEyR98U3KeXGg0FIKUQF9S3RhxoZXu4J' }),
    publicProvider(),
  ])   
  // Set up client
  const client = createClient({
    autoConnect: true,
    provider,
    webSocketProvider,
  })
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
           <WagmiConfig client={client}>
                <Provider store={store}>
                    {getLayout(<Component {...pageProps} />)}
                </Provider>
            </WagmiConfig>
        </QueryClientProvider>
    )
}

export default appWithTranslation(App)

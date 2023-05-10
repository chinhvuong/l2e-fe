import GlobalLoading from '@/components/common/global-loading'
import Layout from '@/layout'
import WalletLogic from '@/layout/main-layout/header/wallet-logic'
import { store } from '@/store'
import '@/styles/base.scss'
import '@/styles/global-style.css'
import WagmiProvider from '@/wallet/provider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { Provider } from 'react-redux'
type NextPageWithLayout = NextPage & {
    // eslint-disable-next-line no-unused-vars
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        const handleStart = (url: string) => setIsLoading(true)
        const handleComplete = (url: string) => {
            setIsLoading(false)
        }

        router.events.on('routeChangeStart', handleStart)
        router.events.on('routeChangeComplete', handleComplete)
        router.events.on('routeChangeError', handleComplete)

        return () => {
            router.events.off('routeChangeStart', handleStart)
            router.events.off('routeChangeComplete', handleComplete)
            router.events.off('routeChangeError', handleComplete)
        }
    })
    // Use the layout defined at the page level, if available
    const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: 0, refetchOnWindowFocus: false } },
    })
    const getLayout = Component.getLayout ?? ((page) => <Layout>{page}</Layout>)

    return (
        <QueryClientProvider client={queryClient}>
            <WagmiProvider>
                <Provider store={store}>
                    <DndProvider backend={HTML5Backend}>
                        <WalletLogic />
                        <GlobalLoading isLoading={isLoading} />
                        <>{getLayout(<Component {...pageProps} />)}</>
                    </DndProvider>
                </Provider>
            </WagmiProvider>
        </QueryClientProvider>
    )
}

export default App

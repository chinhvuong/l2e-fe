import React, { ReactElement, ReactNode } from 'react'
import { NextPage } from 'next';
import '@/styles/global-style.css'
import { AppProps } from 'next/app';
import Layout from '@/layout'
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function App({ Component, pageProps }: AppPropsWithLayout) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => (
    <Layout>
      {page}
    </Layout>
  ))
  return getLayout(<Component {...pageProps} />)
}

export default App;
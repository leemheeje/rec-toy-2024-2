import 'bootstrap/dist/css/bootstrap.min.css'
import '@/styles/globals.css'

import Layout from '@/layouts/layout'

export default function App({Component, pageProps}) {
  function globalFunction() {
    console.log('globalFunctionglobalFunctionglobalFunctionglobalFunction')
  }
  console.log('app')
  return (
    <Layout>
      <Component {...pageProps} globalFunction={globalFunction} />
    </Layout>
  )
}

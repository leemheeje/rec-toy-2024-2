import {Html, Head, Main, NextScript} from 'next/document'

export default function Document() {
  console.log('_Document')
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <div
          id="__MODAL_TOAST_WRAPPING__"
          style={{
            width: '100%',
            padding: '10px',
            position: 'fixed',
            left: 0,
            bottom: 0,
            zIndex: 9999
          }}
        ></div>
      </body>
    </Html>
  )
}

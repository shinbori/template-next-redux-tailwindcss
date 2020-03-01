import { ElementType } from 'react'
import '../css/tailwind.css'

type Props = {
  Component: ElementType
  pageProps: any
}

export default ({ Component, pageProps }: Props) => {
  return <Component {...pageProps} />
}

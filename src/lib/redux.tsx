import React, { ReactComponentElement } from 'react'
import { Provider } from 'react-redux'
import { Store, combineReducers } from 'redux'
import App from 'next/app'
import { NextPage, NextPageContext } from 'next'
import { configureStore } from '@reduxjs/toolkit'
import _ from 'lodash'
import * as slicers from '../slicers'

let reduxStore: Store

interface WithReduxPageContext extends NextPageContext {
  reduxStore: Store
}

export const withRedux = (PageComponent: NextPage, { ssr = true } = {}) => {
  const WithRedux = ({ ...props }) => {
    const store = getOrInitializeStore()

    return (
      <Provider store={store}>
        <PageComponent {...props} />
      </Provider>
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    if (PageComponent.prototype instanceof App) {
      throw new Error('The withRedux HOC only works with PageComponents')
    }
    WithRedux.displayName = `withRedux(${PageComponent.displayName || PageComponent.name || 'Component'})`
  }

  if (ssr || PageComponent.getInitialProps) {
    WithRedux.getInitialProps = async (context: WithReduxPageContext) => {
      const reduxStore = getOrInitializeStore()
      context.reduxStore = reduxStore
      const pageProps = typeof PageComponent.getInitialProps === 'function' ? await PageComponent.getInitialProps(context) : {}
      return { ...pageProps, initialReduxState: reduxStore.getState() }
    }
  }
  return WithRedux
}

const getOrInitializeStore = () => {
  const initializeStore = () => {
    return configureStore({
      reducer: combineReducers(_.mapValues(slicers, e => e.reducer)),
      devTools: true,
    })
  }
  if (typeof window === 'undefined') {
    return initializeStore()
  }
  if (!reduxStore) {
    reduxStore = initializeStore()
  }
  return reduxStore
}

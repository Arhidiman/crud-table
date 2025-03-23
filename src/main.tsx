import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider, useDispatch, useSelector, useStore } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './rootReducer/rootReducer'
import App from './App.tsx'
import './index.css'

const store = configureStore({reducer: rootReducer, devTools: true})

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
          <App />
      </Provider>
  </StrictMode>,
)

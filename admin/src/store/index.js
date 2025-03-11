import { configureStore } from '@reduxjs/toolkit'
import loader from '../reducers/loader'

export const store = configureStore({
  reducer: {
    loader: loader
  },
})
import { configureStore } from '@reduxjs/toolkit'
import mode from '../reducers/mode'
import infoReducer from '../reducers/info'
import loaderReducers from '../reducers/loader'

export const store = configureStore({
  reducer: {
    mode: mode,
    info: infoReducer,
    load: loaderReducers,
  },
})
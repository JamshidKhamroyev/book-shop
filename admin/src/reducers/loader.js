import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loader: false,
}

export const counterSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => {
      state.loader = true
    },
    hideLoader: (state) => {
      state.loader = false
    }
  },
})

export const { hideLoader, showLoader } = counterSlice.actions

export default counterSlice.reducer
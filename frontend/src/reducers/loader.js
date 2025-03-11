import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  load: false,
}

export const counterSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    showLoader: (state) => {
        document.body.classList.add("blockBody")
        state.load = true
    },
    hideLoader: (state) => {
        state.load = false
        document.body.classList.remove("blockBody")
    }
  },
})

export const { showLoader, hideLoader } = counterSlice.actions

export default counterSlice.reducer
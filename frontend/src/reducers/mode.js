import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: localStorage.getItem("mode") === "true" || false,
}

export const counterSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    setMode: (state) => {
        const value = state.mode
        state.mode = !value
        localStorage.setItem("mode", !value)
    }
  },
})

export const {setMode } = counterSlice.actions

export default counterSlice.reducer
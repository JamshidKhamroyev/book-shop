import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  info: null,
}

export const counterSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setInfo: (state, action) => {
        state.info = action.payload
    }
  },
})

export const { setInfo } = counterSlice.actions

export default counterSlice.reducer
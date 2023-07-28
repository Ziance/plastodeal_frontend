import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../../redux/store"

const INITIAL_STATE = {
  windowHeight: 784,
}

const sharedSlice = createSlice({
  name: "Shared",
  initialState: INITIAL_STATE,
  reducers: {
    setWindowHeight: (state, action) => {
      state.windowHeight = action.payload
    },
  },
})

// export const sharedSelector = (state: RootState) => state.Shared
export const { setWindowHeight } = sharedSlice.actions
export default sharedSlice.reducer

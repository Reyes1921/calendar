import {createSlice} from "@reduxjs/toolkit"

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    status: "cheking",
    user: {},
    errorMessage: undefined,
  },
  reducers: {
    cheking: (state) => {
      state.status = "cheking"
      state.user = {}
      state.errorMessage = undefined
    },
    onLogin: (state, {payload}) => {
      state.status = "authenticated"
      state.user = payload
      state.errorMessage = undefined
    },
    onLogout: (state, {payload}) => {
      state.status = "not-authenticated"
      state.user = {}
      state.errorMessage = payload
    },
    clearErrorMessage: (state) => {
      state.errorMessage = undefined
    },
  },
})

// Action creators are generated for each case reducer function
export const {cheking, onLogin, onLogout, clearErrorMessage} = authSlice.actions

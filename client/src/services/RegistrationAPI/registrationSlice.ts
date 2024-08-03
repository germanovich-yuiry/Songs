import type { PayloadAction } from "@reduxjs/toolkit"
import { createAppSlice } from "../../app/createAppSlice"
import type { AppThunk } from "../../app/store"
import { fetchCount } from "../../features/counter/counterAPI"
import { fetchRegistration } from "./registrationAPI"
import { counterSlice, selectStatus } from "../../features/counter/counterSlice"
import setAuthToken from "../../utils/setAuthToken"
import { saveToken } from "../../utils/tokenHandler"

export interface FetchRegistrationState {
  token: string
  status: "idle" | "loading" | "failed"
  message: string
}

const initialState: FetchRegistrationState = {
  token: "no token",
  status: "idle",
  message: "",
}

export const registrationSlice = createAppSlice({
  name: "registration",
  initialState,
  reducers: create => ({
    getToken: create.asyncThunk(
      async (user: { name: string; email: string; password: string }) => {
        const response = await fetchRegistration(user)

        return response
      },
      {
        pending: state => {
          state.status = "loading"
        },
        fulfilled: (state, action) => {
          state.status = "idle"
          state.token = action.payload.token
          if (action.payload.token) saveToken(action.payload.token)
          state.message = action.payload.message
        },
        rejected: (state, action) => {
          state.status = "failed"
          state.message = ""
        },
      },
    ),
  }),

  selectors: {
    selectToken: registration => registration.token,
    selectTokenStatus: registration => registration.status,
    selectMessage: registration => registration.message,
  },
})

export const { getToken } = registrationSlice.actions

export const { selectToken, selectTokenStatus, selectMessage } =
  registrationSlice.selectors

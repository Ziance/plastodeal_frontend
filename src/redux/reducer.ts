import { AnyAction, CombinedState, combineReducers } from "redux"
import authReducer from "../redux/auth/authSlice"

const reducer = combineReducers({
  Auth: authReducer,
})

const rootReducer = (state: CombinedState<any> | undefined, action: any) => {
  if (action.type === "Auth/logout") {
    state = undefined
  }
  return reducer(state, action)
}

export default rootReducer

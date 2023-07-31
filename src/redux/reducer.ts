import { AnyAction, CombinedState, combineReducers } from "redux"
import authReducer from "../redux/auth/authSlice"
import dashboardReducer from "../redux/dashboard/dashboardSlice"

const reducer = combineReducers({
  Auth: authReducer,
  DashBoard: dashboardReducer
})

const rootReducer = (state: CombinedState<any> | undefined, action: any) => {
  if (action.type === "Auth/logout") {
    state = undefined
  }
  return reducer(state, action)
}

export default rootReducer

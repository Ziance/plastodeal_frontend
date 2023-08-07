import { AnyAction, CombinedState, combineReducers } from "redux";
import authReducer from "../redux/auth/authSlice";
import dashboardReducer from "../redux/dashboard/dashboardSlice";
import usersReducer from "../redux/SuperAdminController/users/usersSlice";
import jobsReducer from "../redux/SuperAdminController/jobs/jobsSlice";

const reducer = combineReducers({
  Auth: authReducer,
  DashBoard: dashboardReducer,
  Users: usersReducer,
  Jobs: jobsReducer,
});

const rootReducer = (state: CombinedState<any> | undefined, action: any) => {
  if (action.type === "Auth/logout") {
    state = undefined;
  }
  return reducer(state, action);
};

export default rootReducer;

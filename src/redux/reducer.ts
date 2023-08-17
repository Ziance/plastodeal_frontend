import { AnyAction, CombinedState, combineReducers } from "redux";
import authReducer from "../redux/auth/authSlice";
import dashboardReducer from "../redux/dashboard/dashboardSlice";
import usersReducer from "../redux/SuperAdminController/users/usersSlice";
import jobsReducer from "../redux/SuperAdminController/jobs/jobsSlice";
import masterReducer from "../redux/SuperAdminController/masters/mastersSlice";
import postReducer from "../redux/SuperAdminController/post-requirements/postRequirementsSlice"
import catagoryReducer from "../redux/SuperAdminController/catagories/catagoriesSlice"
import approvalReducer from "./SuperAdminController/approval/approvalSlice"
import advertisementReducer from "./SuperAdminController/advertisement/advertisementSlice"
const reducer = combineReducers({
  Auth: authReducer,
  DashBoard: dashboardReducer,
  Users: usersReducer,
  Jobs: jobsReducer,
  Masters: masterReducer,
  Posts: postReducer,
  Catagory: catagoryReducer,
  Approval: approvalReducer,
  Advertisement: advertisementReducer
});

const rootReducer = (state: CombinedState<any> | undefined, action: any) => {
  if (action.type === "Auth/logout") {
    state = undefined;
  }
  return reducer(state, action);
};

export default rootReducer;

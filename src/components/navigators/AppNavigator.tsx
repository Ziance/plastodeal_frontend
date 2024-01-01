import React, { useEffect, useState } from "react";
import SuperAdminRoutes from "./superAdminRoutes";
import AdminRoutes from "./adminRoutes";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/authSlice";

function App() {
  const { currentUser } = useSelector(authSelector);
  const [superAdmin, setSuperAdmin] = useState(true);

  useEffect(() => {
    if (currentUser?.user?.userRole?.toLowerCase() !== "superadmin") {
      setSuperAdmin(false)
    }
  }, [currentUser]);

  return (
    superAdmin ? (<SuperAdminRoutes />) : (<AdminRoutes />)
  );
}

export default App;

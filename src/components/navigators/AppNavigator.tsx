// import "./App.css";
import React, { lazy, Suspense, useEffect, useState } from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SuperAdminRoutes from "./superAdminRoutes"
import AdminRoutes from "./adminRoutes";
import { useSelector } from "react-redux";
import { authSelector } from "../../redux/auth/authSlice";


function App() {
  const {currentUser} = useSelector(authSelector)
  const [superAdmin, setSuperAdmin] = useState(true)

  useEffect(()=>{
    if (currentUser?.user?.userRole) {
      setSuperAdmin(false)
    }
  },[])
  return (
    <>
      {
        superAdmin ?
          <>
            <SuperAdminRoutes />
          </>
          :
          <><AdminRoutes /></>
      }
    </>

  );
}

export default App;

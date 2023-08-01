// import "./App.css";
import React, { lazy, Suspense, useEffect, useState } from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SuperAdminRoutes from "./superAdminRoutes"
import AdminRoutes from "./adminRoutes";


function App() {
  const [superAdmin, setSuperAdmin] = useState(true)
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

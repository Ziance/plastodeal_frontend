// import "./App.css";
import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

const Dashboard = lazy(() => import("../../Pages/Dashboard/index"));
const Login = lazy(() => import("../../screens/login"));
const Signup = lazy(() => import("../../screens/signup"));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/companyRegistration" element={<Signup />}></Route>
      </Routes>
    </Suspense>
  );
}

export default App;

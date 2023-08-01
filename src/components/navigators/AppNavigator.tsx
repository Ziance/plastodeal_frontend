// import "./App.css";
import React, { lazy, Suspense, useEffect, useState } from "react"
import { Routes, Route, BrowserRouter } from "react-router-dom";
import SuperAdminRoutes from "./superAdminRoutes"


// -------------super admin--------------------------------
const SuperAdminDashboard = lazy(() => import("../../Pages/Dashboard/index"))
const SuperAdminUsers = lazy(() => import("../../Pages/About"))
const SuperAdminJobs = lazy(() => import("../../Pages/Share App"))
const SuperAdminMasters = lazy(() => import("../../Pages/Post Requirement"))
const SuperAdminAdverstisement = lazy(() => import("../../Pages/Language"))
const SuperAdminPostRequirement = lazy(() => import("../../Pages/Faq"))
const SuperAdminApporval = lazy(() => import("../../Pages/Privacy Policy"))
const SuperAdminVideo = lazy(() => import("../../Pages/Refund Policy"))



// //////////////////////////////////////////////////////////////////////////////
const Dashboard = lazy(() => import("../../Pages/Dashboard/index"))
const AboutUs = lazy(() => import("../../Pages/About"))
const ShareApp = lazy(() => import("../../Pages/Share App"))
const PostRequirement = lazy(() => import("../../Pages/Post Requirement"))
const Language = lazy(() => import("../../Pages/Language"))
const Faq = lazy(() => import("../../Pages/Faq"))
const PrivacyPolicy = lazy(() => import("../../Pages/Privacy Policy"))
const RefundPoicy = lazy(() => import("../../Pages/Refund Policy"))
const Login = lazy(() => import("../../screens/login"))
const Signup = lazy(() => import("../../screens/signup"))
const Freelogin = lazy(() => import("../../screens/freelogin"))
const CompanyRegistration = lazy(() => import("../../screens/companyRegistration"))
const ForgotPassword = lazy(() => import("../../screens/forgotPassword"))
const DashboardCardDetails = lazy(() => import("../../Pages/Dashboard/DashBoardCardsDetails"))

function App() {
  const [superAdmin, setSuperAdmin] = useState(true)
  return (
    <>
      {
        superAdmin ?
          <>
            <SuperAdminRoutes />
          </>
          : <Suspense fallback={null}>
            <Routes>

              <Route path="/" element={<Dashboard />}></Route>
              <Route path="/about" element={<AboutUs />}></Route>
              <Route path="/share-app" element={<ShareApp />}></Route>
              <Route path="/post-requirement" element={<PostRequirement />}></Route>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/language" element={<Language />}></Route>
              <Route path="/faq" element={<Faq />}></Route>
              <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
              <Route path="/refund-policy" element={<RefundPoicy />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/freelogin" element={<Freelogin />}></Route>
              <Route path="/companyRegistration" element={<CompanyRegistration />}></Route>
              {/* <Route path="/forgotPassword"  element={<ForgotPassword/>}></Route> */}
              <Route path="/dashboard/:dynamicPath" element={< DashboardCardDetails />}></Route>
              </Routes>
              </Suspense>
                  }
            </>

            );
}

            export default App;

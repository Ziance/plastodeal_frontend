import React, { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import SuperAdminDashboard from '../../../Pages/superAdmin/superAdminDashboard'

const SuperAdminRoutes = () => {
  return (
   <>
    <Suspense fallback={null}>
      <Routes>
   <Route path="/"  element={<SuperAdminDashboard />}></Route>
   </Routes>
   </Suspense>
   {/* <Route path="/superadmin/users"  element={<AboutUs />}></Route>
   <Route path="/superadmin/jobs"  element={<ShareApp />}></Route>
   <Route path="/superadmin/masters"  element={<PostRequirement/>}></Route>
   <Route path="/superadmin/adverstisement"  element={<Login />}></Route>
   <Route path="/superadmin/post-requirement"  element={<Language />}></Route>
   <Route path="/superadmin/apporval"  element={<Faq  />}></Route>
   <Route path="/superadmin/Video"  element={<PrivacyPolicy />}></Route> */}
   {/* <Route path="/superadmin/refund-policy"  element={<RefundPoicy />}></Route>
   <Route path="/superadmin/signup"  element={<Signup />}></Route>
   <Route path="/superadmin/freelogin"  element={<Freelogin />}></Route>
   <Route path="/companyRegistration"  element={<CompanyRegistration />}></Route> */}
   {/* <Route path="/forgotPassword"  element={<ForgotPassword/>}></Route> */}
   {/* <Route path="/dashboard/:dynamicPath"  element={< DashboardCardDetails/>}></Route> */}
   </>
  )
}

export default SuperAdminRoutes
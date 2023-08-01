import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import SuperAdminDashboard from '../../../Pages/superAdmin/superAdminDashboard'

const SuperAdminRoutes = () => {
    const SuperAdminDashboard = lazy(() => import("../../../Pages/superAdmin/superAdminDashboard"))
    const SuperAdminUsers = lazy(() => import("../../../Pages/superAdmin/superAdminUsers"))
    const SuperAdminJobs = lazy(() => import("../../../Pages/superAdmin/superAdminJobs"))
    const SuperAdminMasters = lazy(() => import("../../../Pages/superAdmin/superAdminMasters"))
    const SuperAdminAdverstisement = lazy(() => import("../../../Pages/superAdmin/superAdminAdvertisement"))
    const SuperAdminPostRequirement = lazy(() => import("../../../Pages/superAdmin/superAdminPostReq"))
    const SuperAdminApporval = lazy(() => import("../../../Pages/superAdmin/superAdminJApproval"))
    const SuperAdminVideo = lazy(() => import("../../../Pages/superAdmin/superAdminVideo"))
    return (
        <>
            <Suspense fallback={null}>
                <Routes>
                    <Route  path="/" element={<SuperAdminDashboard />}></Route>
                    <Route path="/superadmin/users" element={<SuperAdminUsers/>}></Route>
                    <Route path="/superadmin/jobs" element={<SuperAdminJobs/>}></Route>
                    <Route path="/superadmin/masters" element={<SuperAdminMasters />}></Route>
                    <Route path="/superadmin/advertisement" element={<SuperAdminAdverstisement />}></Route>
                    <Route path="/superadmin/post-requirement" element={<SuperAdminPostRequirement />}></Route>
                    <Route path="/superadmin/approval" element={<SuperAdminApporval />}></Route>
                    <Route path="/superadmin/video" element={<SuperAdminVideo />}></Route>

                </Routes>
            </Suspense>
            {/* <Route path="/superadmin/users"  element={<AboutUs />}></Route>
            <Route path="/superadmin/jobs"  elemenFt={<ShareApp />}></Route>
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
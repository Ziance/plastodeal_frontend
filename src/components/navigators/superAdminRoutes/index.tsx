import React, { Suspense, lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdvertisementDetails from '../../CommonPageDetails'

const SuperAdminRoutes = () => {
    const SuperAdminDashboard = lazy(() => import("../../../Pages/superAdmin/superAdminDashboard"))
    const SuperAdminUsers = lazy(() => import("../../../Pages/superAdmin/superAdminUsers"))
    const SuperAdminJobs = lazy(() => import("../../../Pages/superAdmin/superAdminJobs/index"))
    const SuperAdminMasters = lazy(() => import("../../../Pages/superAdmin/superAdminMasters"))
    const SuperAdminAdverstisement = lazy(() => import("../../../Pages/superAdmin/superAdminAdvertisement"))
    const SuperAdminPostRequirement = lazy(() => import("../../../Pages/superAdmin/superAdminPostReq"))
    const SuperAdminApporval = lazy(() => import("../../../Pages/superAdmin/superAdminJApproval"))
    const SuperAdminVideo = lazy(() => import("../../../Pages/superAdmin/superAdminVideo"))
    const ServiceDetails = lazy(() => import("../../../Pages/superAdmin/serviceDetails"))
    const AddJobsForm = lazy(() => import("../../../Pages/superAdmin/superAdminJobs/addJobsForm"))
    const CompanyRegistration = lazy(() => import("../../../screens/companyRegistration"))
    const FreeLoginSignUp = lazy(() => import("../../../screens/freelogin"))
    const MastersDetails = lazy(() => import("../../../Pages/superAdmin/superAdminMasters/mastersDetails"))


    return (
        <Suspense fallback={null}>
            <Routes>
                <Route path="/" element={<SuperAdminDashboard />} />
                <Route path="/superadmin/users" element={<SuperAdminUsers />} />
                <Route path="/superadmin/jobs" element={<SuperAdminJobs />} />
                <Route path="/superadmin/jobs/addjob" element={<AddJobsForm />} />
                <Route path="/superadmin/masters" element={<SuperAdminMasters />} />
                <Route path="/superadmin/advertisement" element={<SuperAdminAdverstisement />} />
                <Route path="/superadmin/post-requirement" element={<SuperAdminPostRequirement />} />
                <Route path="/superadmin/approval" element={<SuperAdminApporval />} />
                <Route path="/superadmin/video" element={<SuperAdminVideo />} />
                <Route path="/:superadmin/companyRegistration" element={<CompanyRegistration />} />
                <Route path="/:superadmin/individualregister" element={<FreeLoginSignUp />} />
                <Route path="/superadmin/dashboard/:dynamicPath" element={<ServiceDetails />} />
                <Route path="/superadmin/:midPath/processor-table/:dynamicPath" element={<AdvertisementDetails />} />
                <Route path="/superadmin/masters/:dynamicPath" element={<MastersDetails />} />
            </Routes>
        </Suspense>
    )
}

export default SuperAdminRoutes
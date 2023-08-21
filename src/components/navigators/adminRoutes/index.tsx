import React, { lazy, Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";


const AdminRoutes = () => {
  const Dashboard = lazy(() => import("../../../Pages/Dashboard/index"));
  const AboutUs = lazy(() => import("../../../Pages/About"));
  const ShareApp = lazy(() => import("../../../Pages/Share App"));
  const PostRequirement = lazy(() => import("../../../Pages/Post Requirement"));
  const Language = lazy(() => import("../../../Pages/Language"));
  const Faq = lazy(() => import("../../../Pages/Faq"));
  const PrivacyPolicy = lazy(() => import("../../../Pages/Privacy Policy"));
  const RefundPoicy = lazy(() => import("../../../Pages/Refund Policy"));
  const Login = lazy(() => import("../../../screens/login"));
  const Signup = lazy(() => import("../../../screens/signup"));
  const Freelogin = lazy(() => import("../../../screens/freelogin"));
  const Profile = lazy(() => import("../../../components/profile"));
  const CompanyRegistration = lazy(
    () => import("../../../screens/companyRegistration")
  );
  const ForgotPassword = lazy(() => import("../../../screens/forgotPassword"));
  const ProductDetails = lazy(
    () => import("../../../Pages/Dashboard/ProductDetails")
  );
  return (
    <>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/about" element={<AboutUs />}></Route>
          <Route path="/share-app" element={<ShareApp />}></Route>
          <Route path="/post-requirement" element={<PostRequirement />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/admin/companyprofile" element={<Profile />}></Route>
          <Route path="/language" element={<Language setLanguageDialogOpen={function (value: any): void {
            throw new Error("Function not implemented.");
          }} languageDialogOpen={false} />}></Route>
          <Route path="/faq" element={<Faq />}></Route>
          <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
          <Route path="/refund-policy" element={<RefundPoicy />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/freelogin" element={<Freelogin />}></Route>
          <Route
            path="/companyRegistration"
            element={<CompanyRegistration />}
          ></Route>
          {/* <Route path="/forgotPassword"  element={<ForgotPassword/>}></Route> */}
          <Route
            path="/dashboard/:dynamicPath"
            element={<ProductDetails />}
          ></Route>
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
  );
};

export default AdminRoutes;

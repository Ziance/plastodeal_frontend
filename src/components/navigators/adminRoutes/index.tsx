import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const AdminRoutes = () => {
  const Dashboard = lazy(() => import("../../../Pages/Dashboard/index"));
  const AboutUs = lazy(() => import("../../../Pages/About"));
  const ShareApp = lazy(() => import("../../../Pages/ShareApp"));
  const PostRequirement = lazy(() => import("../../../Pages/PostRequirement"));
  const Language = lazy(() => import("../../../Pages/Language"));
  const Faq = lazy(() => import("../../../Pages/Faq"));
  const PrivacyPolicy = lazy(() => import("../../../Pages/PrivacyPolicy"));
  const RefundPoicy = lazy(() => import("../../../Pages/RefundPolicy"));
  const Login = lazy(() => import("../../../screens/login"));
  const Signup = lazy(() => import("../../../screens/signup"));
  const Freelogin = lazy(() => import("../../../screens/freelogin"));
  const Profile = lazy(() => import("../../../components/profile"));
  const ResetPasword = lazy(() => import("../../../screens/resetPassword"))
  const CompanyRegistration = lazy(() => import("../../../screens/companyRegistration"));
  const ProductDetails = lazy(() => import("../../../Pages/Dashboard/ProductDetails"));

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/share-app" element={<ShareApp />} />
        <Route path="/post-requirement" element={<PostRequirement />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ResetPasword" element={<ResetPasword />} />
        <Route path="/admin/profile" element={<Profile />} />
        <Route path="/language" element={<Language setLanguageDialogOpen={function (value: any): void { throw new Error("Function not implemented."); }} languageDialogOpen={false} />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPoicy />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/freelogin" element={<Freelogin />} />
        <Route path="/companyRegistration" element={<CompanyRegistration />} />
        <Route path="/dashboard/:dynamicPath" element={<ProductDetails />} />
      </Routes>
    </Suspense>
  );
};

export default AdminRoutes;

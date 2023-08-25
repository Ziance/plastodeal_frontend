// import "./App.css";
import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import FreeLoginSignUp from "../../screens/freelogin";
import CompanyRegistration from "../../screens/companyRegistration";



const Dashboard = lazy(() => import("../../Pages/Dashboard/index"))
const Login = lazy(() => import("../../screens/login"))
const Signup = lazy(() => import("../../screens/signup"))
const ForgotPassword = lazy(() => import("../../screens/forgotPassword/index"))
const AboutUs = lazy(() => import("../../Pages/About"));
const ShareApp = lazy(() => import("../../Pages/Share App"));
const PostRequirement = lazy(() => import("../../Pages/Post Requirement"));
const Language = lazy(() => import("../../Pages/Language"));
const Faq = lazy(() => import("../../Pages/Faq"));
const PrivacyPolicy = lazy(() => import("../../Pages/Privacy Policy"));
const RefundPoicy = lazy(() => import("../../Pages/Refund Policy"));
const ProductDetails = lazy(() => import("../../Pages/Dashboard/ProductDetails"));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Dashboard />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/companyRegistration" element={<CompanyRegistration />}></Route>
        <Route path="/freelogin" element={<FreeLoginSignUp />}></Route>
        <Route path="/about" element={<AboutUs />}></Route>
        <Route path="/share-app" element={<ShareApp />}></Route>
        <Route path="/post-requirement" element={<PostRequirement />}></Route>
        <Route path="/language" element={<Language setLanguageDialogOpen={function (value: any): void {
          throw new Error("Function not implemented.");
        }} languageDialogOpen={false} />}></Route>
        <Route path="/faq" element={<Faq />}></Route>
        <Route path="/privacy-policy" element={<PrivacyPolicy />}></Route>
        <Route path="/refund-policy" element={<RefundPoicy />}></Route>
        <Route
            path="/dashboard/:dynamicPath"
            element={<ProductDetails />}
          ></Route>
      </Routes>
    </Suspense>
  );
}

export default App;

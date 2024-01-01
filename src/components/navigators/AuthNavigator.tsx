import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Dashboard = lazy(() => import("../../Pages/Dashboard"))
const Login = lazy(() => import("../../screens/login"))
const Signup = lazy(() => import("../../screens/signup"))
const ForgotPassword = lazy(() => import("../../screens/forgotPassword"))
const AboutUs = lazy(() => import("../../Pages/About"));
const ShareApp = lazy(() => import("../../Pages/ShareApp"));
const PostRequirement = lazy(() => import("../../Pages/PostRequirement"));
const Faq = lazy(() => import("../../Pages/Faq"));
const PrivacyPolicy = lazy(() => import("../../Pages/PrivacyPolicy"));
const RefundPoicy = lazy(() => import("../../Pages/RefundPolicy"));
const ProductDetails = lazy(() => import("../../Pages/Dashboard/ProductDetails"));
const CompanyRegistration = lazy(() => import("../../screens/companyRegistration"));
const FreeLoginSignUp = lazy(() => import("../../screens/freelogin"));


function App() {
  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/companyRegistration" element={<CompanyRegistration />} />
        <Route path="/freelogin" element={<FreeLoginSignUp />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/share-app" element={<ShareApp />} />
        <Route path="/post-requirement" element={<PostRequirement />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/refund-policy" element={<RefundPoicy />} />
        <Route path="/dashboard/:dynamicPath" element={<ProductDetails />} />
      </Routes>
    </Suspense>
  );
}

export default App;

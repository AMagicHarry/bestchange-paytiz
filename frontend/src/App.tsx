// Importing libraries
import { Routes, Route, Outlet } from "react-router-dom";

// Local component imports
import Navbar from "./components/Navbar/Navbar";
import Navbar2 from "./components/Navbar2/Navbar2";
import AdminDashboard from "./pages/AdminDashboard/Dashboard/Dashboard";
import AdminDashboardHome from "./pages/AdminDashboard/Dashboard/Home/Home";
import ExchangerDetails from "./pages/AdminDashboard/Dashboard/ExchangerDetails/ExchangerDetails";
import AdminDashboardReferrals from "./pages/AdminDashboard/Referrals/Referrals";
import AdminDashboardReferralsHome from "./pages/AdminDashboard/Referrals/Home/Home";
import AdminDashboardReferralsDetails from "./pages/AdminDashboard/Referrals/Details/Details";
import Blog from "./pages/AdminDashboard/Blog/Blog";
import UserExchangerAdminDashboard from "./pages/UserExchangerAdminDashboard/Dashboard/Dashboard";
import UserExchangerAdminReferrals from "./pages/UserExchangerAdminDashboard/Referrals/Referrals";
import UserExchangerAdminReviews from "./pages/UserExchangerAdminDashboard/Reviews/Reviews";
import NotFound from "./pages/NotFound/NotFound";

// CSS imports
import './App.css';

// Layout components for different sections of the app
const Layout1 = () => (
  <div className="bg-gray-100 w-full h-screen overflow-y-auto">
    <div className="sticky top-0 z-[99999]">
      <Navbar />
    </div>
    <div className="w-full h-[calc(100%-4rem)] max-w-[1120px] mx-auto">
      <Outlet />
    </div>
  </div>
);

const Layout2 = () => (
  <div className="bg-gray-100 w-full h-screen overflow-y-auto">
    <div className="sticky top-0 z-[99999]">
      <Navbar2 />
    </div>
    <div className="w-full h-[calc(100%-4rem)] max-w-[1120px] mx-auto">
      <Outlet />
    </div>
  </div>
);


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout1 />}>
        <Route  element={<AdminDashboard />}>
          <Route index element={<AdminDashboardHome />} />
          <Route path="/:username/:exchangerId" element={<ExchangerDetails />} />
        </Route>
        <Route path="/referrals" element={<AdminDashboardReferrals />}>
          <Route index element={<AdminDashboardReferralsHome />} />
          <Route path=":username/:exchangerId" element={<AdminDashboardReferralsDetails />} />
        </Route>
        <Route path="/blog" element={<Blog />} />
      </Route>

      <Route path="/user-admin" element={<Layout2 />}>
        <Route path=":username" element={<UserExchangerAdminDashboard />} />
        <Route path=":username/referrals" element={<UserExchangerAdminReferrals />} />
        <Route path=":username/reviews" element={<UserExchangerAdminReviews />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

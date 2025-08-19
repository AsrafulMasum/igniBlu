import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import DashboardHome from "./Pages/Dashboard/DashboardHome/DashboardHome";
import Otp from "./Pages/Auth/Otp";
import Login from "./Pages/Auth/Login";
import UpdatePassword from "./Pages/Auth/UpdatePassword";
import NotFound from "./404";
import PrivateRoute from "./routes/PrivateRoute";
import ChangePassword from "./Pages/Dashboard/ChangePassword";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import AdminProfile from "./Pages/Dashboard/AdminProfile";
import AboutUs from "./Pages/Dashboard/AboutUs";
import Terms from "./Pages/Dashboard/Terms";
import Notification from "./Pages/Dashboard/Notification";
import UserLists from "./Pages/Dashboard/UserLists";
import Support from "./Pages/Dashboard/Support";
import DeviceList from "./Pages/Dashboard/DeviceList";
import VehicleList from "./Pages/Dashboard/VehicleList";
import DriverList from "./Pages/Dashboard/DriverList";
import ActivityList from "./Pages/Dashboard/ActivityList";
import GarageHistory from "./Pages/Dashboard/GarageHistory";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<DashboardHome />} />
            <Route path="/device-lists" element={<DeviceList />} />
            <Route path="/user-lists" element={<UserLists />} />
            <Route path="/vehicle-lists" element={<VehicleList />} />
            <Route path="/driver-list" element={<DriverList />} />
            <Route path="/activity-list" element={<ActivityList />} />
            <Route path="/garage-history" element={<GarageHistory />} />
            <Route path="/support" element={<Support />} />

            <Route path="/settings/about-us" element={<AboutUs />} />
            <Route path="/admin-profile" element={<AdminProfile />} />
            <Route path="/notification" element={<Notification />} />
            <Route
              path="/setting-change-password"
              element={<ChangePassword />}
            />
            <Route path="/settings/terms-conditions" element={<Terms />} />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

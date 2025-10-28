import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loader from "../components/loader/loader";
import Layout from "../layout";
import NotFound from "../pages/notFoundPage/NotFound";
import TradeUserProfile from "../pages/tradeAnalytics/tradeUserProfile";
import CreditSystemManagement from "../pages/creditSystemManagement/CreditSystemManagement";


const Login = lazy(() => import("../pages/loginPage/Login"));
const UserList = lazy(() => import("../pages/userManagement/userList"));
const TradesDashboard = lazy(() => import("../pages/tradeAnalytics/tradesDashboard"));
const BroadcastMessage = lazy(() => import("../pages/broadCastMessage/BroadcastMessage"));
const Profile = lazy(() => import("../pages/adminProfile/profile"));

const Approute = () => {
  const routeList = [
    { path: "/", element: <Login />, layout: false },
    { path: "/user-management", element: <UserList />, layout: true },
    { path: "/trade-analytics", element: <TradesDashboard />, layout: true },
    { path: "/trade-user-profile", element: <TradeUserProfile />, layout: true },
    { path: "/notifications", element: <BroadcastMessage />, layout: true },
    { path: "/profile", element: <Profile />, layout: true },
    { path: "/credit-system", element: <CreditSystemManagement />, layout: true },
    { path: "*", element: <NotFound/> },

  ];

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {routeList.map(({ path, element, layout }) => (
          <Route
            key={path}
            path={path}
            element={layout ? <Layout>{element}</Layout> : element}
          />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Approute;

import React from "react";
import { Route, Routes } from "react-router-dom";

import { Sidebar, Navbar } from "./components";
import {
  CampaignDetails,
  CreateCampaign,
  CreateToken,
  Home,
  Profile,
} from "./pages";
import Landing from "./pages/Landing";
import DashboardRoute from "./components/dashboard/DashboardRoute";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <DashboardRoute>
              <Home />
            </DashboardRoute>
          }
        />
        <Route
          path="/dashboard/profile"
          element={
            <DashboardRoute>
              <Profile />
            </DashboardRoute>
          }
        />
        <Route
          path="/dashboard/create-campaign"
          element={
            <DashboardRoute>
              <CreateCampaign />
            </DashboardRoute>
          }
        />
        <Route
          path="/dashboard/create-token/:campaignId"
          element={
            <DashboardRoute>
              <CreateToken />
            </DashboardRoute>
          }
        />
        <Route
          path="/dashboard/campaign-details/:id"
          element={
            <DashboardRoute>
              <CampaignDetails />
            </DashboardRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;

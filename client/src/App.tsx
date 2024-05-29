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
        <Route path="/landing" element={<Landing />} />
        <Route
          path="/dashboard"
          element={
            <DashboardRoute>
              <Home />
            </DashboardRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <DashboardRoute>
              <Profile />
            </DashboardRoute>
          }
        />
        <Route
          path="/create-campaign"
          element={
            <DashboardRoute>
              <CreateCampaign />
            </DashboardRoute>
          }
        />
        <Route
          path="/create-token/:campaignId"
          element={
            <DashboardRoute>
              <CreateToken />
            </DashboardRoute>
          }
        />
        <Route
          path="/campaign-details/:id"
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

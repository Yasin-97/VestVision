import { Route, Routes } from "react-router-dom";
import {
  ProjectDetails,
  CreateProject,
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
          path="/dashboard/create-project"
          element={
            <DashboardRoute>
              <CreateProject />
            </DashboardRoute>
          }
        />
        <Route
          path="/dashboard/create-token/:projectId"
          element={
            <DashboardRoute>
              <CreateToken />
            </DashboardRoute>
          }
        />
        <Route
          path="/dashboard/project-details/:projectId"
          element={
            <DashboardRoute>
              <ProjectDetails />
            </DashboardRoute>
          }
        />
      </Routes>
    </>
  );
};

export default App;

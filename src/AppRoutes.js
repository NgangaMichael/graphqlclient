// AppRoutes.js
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import ProjectsDetails from "./pages/ProjectsDetails";
import Notfound from "./pages/Notfound";
import Login from "./pages/Login";

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {!user ? (
        <>
          <Route path="*" element={<Login />} />
        </>
      ) : (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/projects/:id" element={<ProjectsDetails />} />
          <Route path="*" element={<Notfound />} />
        </>
      )}
    </Routes>
  );
};

export default AppRoutes;

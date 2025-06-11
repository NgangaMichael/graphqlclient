import Clients from "../components/Clients";
import Projects from "../components/Projects";
import Addclientmodal from "../components/Addclientmodal";
import Addprojectmodal from "../components/Addprojectmodal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // Optional: explicitly navigate to login
  };

  return (
    <>
      {/* Logout button */}
      <div className="d-flex justify-content-end mb-4">
        <button 
          className="btn btn-outline-danger btn-sm" 
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      {/* Action buttons */}
      <div className="d-flex gap-3 mb-4">
        <Addclientmodal />
        <Addprojectmodal />
      </div>

      {/* Main content */}
      <Projects />
      <hr />
      <Clients />
    </>
  );
}
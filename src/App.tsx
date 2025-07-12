import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Home/HomePage";
import UserManagementPage from "./pages/User Management/UserManagementPage";
import MonitoringAbsensiPage from "./pages/Monitoring Absensi/MonitoringAbsensiPage";
import AddUserPage from "./pages/User Management/components/AddUser";
import EditUserPage from "./pages/User Management/components/EditUser";
import type { ReactNode } from "react";
import { useAuthStore } from "./store/authStore";
import "@ant-design/v5-patch-for-react-19";
import ProfilePage from "./pages/ProfilePage";

type ProtectedRouteProps = { children: ReactNode };
const AuthenticatedRoute = ({ children }: ProtectedRouteProps) => {
  const token = useAuthStore((state) => state.token);
  if (token) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export const AuthorizedRoute = ({ children }: ProtectedRouteProps) => {
  const userProfile = useAuthStore((state) => state.userProfile);
  if (userProfile?.role === "hrd") {
    return <>{children}</>;
  } else {
    return <Navigate to="/" replace />;
  }
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <AuthenticatedRoute>
              <HomePage />{" "}
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/profil"
          element={
            <AuthenticatedRoute>
              <ProfilePage />{" "}
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/pengguna"
          element={
            <AuthorizedRoute>
              <UserManagementPage />{" "}
            </AuthorizedRoute>
          }
        />
        <Route
          path="/pengguna/tambah-pengguna"
          element={
            <AuthorizedRoute>
              <AddUserPage />{" "}
            </AuthorizedRoute>
          }
        />
        <Route
          path="/pengguna/edit-pengguna/:id"
          element={
            <AuthorizedRoute>
              <EditUserPage />{" "}
            </AuthorizedRoute>
          }
        />
        <Route
          path="/absensi"
          element={
            <AuthenticatedRoute>
              <MonitoringAbsensiPage />{" "}
            </AuthenticatedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;

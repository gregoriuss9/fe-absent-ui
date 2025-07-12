import { useState, type ReactNode } from "react";
import { useJWT } from "../hooks/useJWT";
import { useSocket } from "../hooks/useSocket";
import { authService } from "../services/auth.service";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useAuthStore } from "../store/authStore";
import { notification } from "antd";

type LayoutProps = { children: ReactNode };

const Layout = ({ children }: LayoutProps) => {
  const token = authService.getToken();
  const { error, isExpired } = useJWT(token);
  const userProfile = useAuthStore((state) => state.userProfile);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useSocket((data) => {
    notification.success({
      message: `${data.name} (${data.department}) baru saja clock-in!`,
      placement: "topRight",
    });
  });

  const handleLogout = () => {
    authService.logout();
    window.location.href = "/login";
  };

  if (isExpired) {
    handleLogout();
  }

  if (error) {
    alert(error);
  }

  return (
    <div className="relative md:static min-h-screen flex flex-row">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        userName={userProfile?.username}
        handleLogout={handleLogout}
        role={userProfile?.role}
      />
      <div
        className={`flex flex-col w-full ${
          isCollapsed ? "md:w-[calc(100vw-80px)]" : "md:w-[calc(100vw-250px)]"
        }`}
      >
        <Header
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
          name={userProfile?.name}
          role={userProfile?.role}
        />
        <div className="p-[16px] bg-[rgb(245,245,245)] h-full">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

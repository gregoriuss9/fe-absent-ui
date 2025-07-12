import { useNavigate } from "react-router-dom";

type SidebarProps = {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  userName?: string | null;
  handleLogout: () => void;
  role?: string | null;
};

const rawMenuItems = [
  {
    name: "Beranda",
    path: "/",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="fill-gray-500 h-[30px] w-[30px]"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z" />
      </svg>
    ),
  },
  {
    name: "Monitoring Absensi",
    path: "/absensi",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        className="fill-gray-500 h-[30px] w-[30px]"
      >
        <path d="M320-414v-306h120v306l-60-56-60 56Zm200 60v-526h120v406L520-354ZM120-216v-344h120v224L120-216Zm0 98 258-258 142 122 224-224h-64v-80h200v200h-80v-64L524-146 382-268 232-118H120Z" />
      </svg>
    ),
  },
  {
    name: "Manajemen Pengguna",
    path: "/pengguna",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className="fill-gray-500 h-[30px] w-[30px]"
      >
        <path d="M0 0h24v24H0V0z" fill="none" />
        <path d="M9 13.75c-2.34 0-7 1.17-7 3.5V19h14v-1.75c0-2.33-4.66-3.5-7-3.5zM4.34 17c.84-.58 2.87-1.25 4.66-1.25s3.82.67 4.66 1.25H4.34zM9 12c1.93 0 3.5-1.57 3.5-3.5S10.93 5 9 5 5.5 6.57 5.5 8.5 7.07 12 9 12zm0-5c.83 0 1.5.67 1.5 1.5S9.83 10 9 10s-1.5-.67-1.5-1.5S8.17 7 9 7zm7.04 6.81c1.16.84 1.96 1.96 1.96 3.44V19h4v-1.75c0-2.02-3.5-3.17-5.96-3.44zM15 12c1.93 0 3.5-1.57 3.5-3.5S16.93 5 15 5c-.54 0-1.04.13-1.5.35.63.89 1 1.98 1 3.15s-.37 2.26-1 3.15c.46.22.96.35 1.5.35z" />
      </svg>
    ),
  },
];

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  userName,
  handleLogout,
  role,
}: SidebarProps) => {
  const navigate = useNavigate();
  const menuItems = role === "hrd" ? rawMenuItems : rawMenuItems.slice(0, 1);
  return (
    <aside
      className={`fixed md:relative z-99 md:z-1 border-r-gray-300 shadow-lg  bg-white min-h-screen md:h-auto  ${
        isCollapsed ? "hidden md:w-[80px] md:block" : "w-100 md:w-[250px]"
      }`}
      style={{ transition: "0.4s" }}
    >
      <div className="flex flex-col justify-center items-center h-[70px] border-b border-b-gray-300">
        {isCollapsed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="fill-gray-500 cursor-pointer h-[30px] scale-x-[-1]"
            onClick={() => setIsCollapsed(false)}
          >
            <path d="M440-280v-400L240-480l200 200Zm80 160h80v-720h-80v720Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className="fill-gray-500 cursor-pointer h-[30px]"
            onClick={() => setIsCollapsed(true)}
          >
            <path d="M440-280v-400L240-480l200 200Zm80 160h80v-720h-80v720Z" />
          </svg>
        )}
        <p className="font-bold text-2xl">{isCollapsed ? "" : "Dashboard"}</p>
      </div>
      <div className="flex flex-col justify-between md:min-h-screen">
        <div>
          {!isCollapsed && (
            <div className="p-5">
              <p className="font-light">Selamat Datang, </p>
              <p className="font-bold">{userName}</p>
            </div>
          )}
          <div className="p-3">
            {menuItems.map((item, idx) => (
              <div
                className="p-2 flex flex-row items-center gap-2 cursor-pointer hover:bg-gray-200"
                key={idx}
                onClick={() => navigate(item.path)}
              >
                <span>{item.icon}</span>
                {!isCollapsed && <p>{item.name}</p>}
              </div>
            ))}
          </div>
        </div>
        <div className="border-t border-t-gray-300">
          <div
            className="px-5 py-3 flex flex-row items-center gap-2 cursor-pointer"
            onClick={() => navigate("/profil")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 -960 960 960"
              className="fill-gray-500 h-[30px] w-[30px]"
            >
              <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z" />
            </svg>
            {!isCollapsed && <p>Profil</p>}
          </div>
          <div
            className="px-5 py-3 flex flex-row items-center gap-2 cursor-pointer"
            onClick={handleLogout}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="fill-red-400 h-[30px] w-[30px]"
            >
              <g>
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <g>
                  <polygon points="17,17 22,12 17,7 15.59,8.41 18.17,11 9,11 9,13 18.17,13 15.59,15.59" />
                  <path d="M19,19H5V5h14v2h2V5c0-1.1-0.89-2-2-2H5C3.9,3,3,3.9,3,5v14c0,1.1,0.9,2,2,2h14c1.11,0,2-0.9,2-2v-2h-2V19z" />
                </g>
              </g>
            </svg>
            {!isCollapsed && <p className="text-red-400">Keluar</p>}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

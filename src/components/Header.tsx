type HeaderProps = {
  isCollapsed: boolean;
  setIsCollapsed: (isCollapsed: boolean) => void;
  name?: string | null;
  role?: string | null;
};

const Header = ({ isCollapsed, setIsCollapsed, name, role }: HeaderProps) => {
  const initials = name
    ?.split(" ")
    .map((word) => word.charAt(0))
    .join("");
  return (
    <div className="flex flex-row justify-between md:justify-end items-center p-[16px] h-[73px]">
      <div className="block md:hidden">
        {isCollapsed ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className=" fill-gray-500 cursor-pointer h-[30px] scale-x-[-1]"
            onClick={() => setIsCollapsed(false)}
          >
            <path d="M440-280v-400L240-480l200 200Zm80 160h80v-720h-80v720Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 -960 960 960"
            className=" fill-gray-500 cursor-pointer h-[30px]"
            onClick={() => setIsCollapsed(true)}
          >
            <path d="M440-280v-400L240-480l200 200Zm80 160h80v-720h-80v720Z" />
          </svg>
        )}
      </div>
      <div className="flex flex-row items-center gap-2">
        <div className="w-[50px] h-[50px] text-white flex justify-center items-center p-2 rounded-full bg-indigo-500">
          {initials}
        </div>
        <div className="flex flex-col">
          <p>{name}</p>
          <p className="text-gray-700 font-light uppercase">{role}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;

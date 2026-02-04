import { logout } from "../utils/localStorageHelpers";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white sm:flex p-4 flex justify-between">
      <h1 className="text-xl font-bold">Employee Management Dashboard
      </h1>
      <button
        onClick={handleLogout}
        className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200"
      >
        Logout
      </button>
    </header>
  );
};

export default Header;

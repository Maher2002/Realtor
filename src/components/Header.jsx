import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  const [pageState, setPageState] = useState("Sign in");
  const auth = getAuth();

  const pathMatchRoute = (route) => {
    if (route === location.pathname) {
      return true;
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setPageState("Profile");
      } else {
        setPageState("Sign in");
      }
    });
  }, [auth]);

  const navigate = useNavigate();

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-40">
      <header className="flex justify-between items-center px-3 max-w-6xl mx-auto">
        <div>
          <img
            src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
            alt="logo"
            className="h-5 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        <div>
          <ul className="flex space-x-10">
            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent cursor-pointer ${
                pathMatchRoute("/") && "border-b-red-800 text-gray-900"
              }`}
              onClick={() => navigate("/")}
            >
              Home
            </li>

            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent cursor-pointer ${
                pathMatchRoute("/offers") && "border-b-red-800 text-gray-900"
              }`}
              onClick={() => navigate("/offers")}
            >
              Offers
            </li>

            <li
              className={`py-3 text-sm font-semibold text-gray-400 border-b-[3px] border-b-transparent cursor-pointer ${
                (pathMatchRoute("/sign-in") || pathMatchRoute("/profile")) &&
                "border-b-red-800 text-gray-900"
              }`}
              onClick={() => navigate("/profile")}
            >
              {/* Sign in */}
              {pageState}
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default Header;

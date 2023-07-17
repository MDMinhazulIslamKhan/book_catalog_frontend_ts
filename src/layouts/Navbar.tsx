import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { removeToken } from "../redux/features/user/userSlice";

const Navbar = () => {
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    dispatch(removeToken());
  };

  return (
    <div className="navbar bg-accent">
      <div className="flex-1">
        <Link to="/">
          <img className="ml-3 w-20" src="/logo.png" alt="logo" />
        </Link>
      </div>
      <div className="flex-1">
        <h1 className="font-extrabold text-primary sm:text-4xl text-lg -ms-5">
          <Link to="/">Book library</Link>
        </h1>
      </div>
      <div className="flex-col-reverse">
        {token ? (
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Your info</summary>
                <ul className="p-2 bg-accent border-primary border-2 z-10">
                  <li>
                    <a>Link 1</a>
                  </li>
                  <li>
                    <a onClick={() => handleLogout()}>Logout</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        ) : (
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/login" className="font-bold text-lg text-primary">
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;

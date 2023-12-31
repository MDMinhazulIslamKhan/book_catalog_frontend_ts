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
        <h1 className="font-extrabold text-primary sm:text-4xl text-xl sm:-ms-5">
          <Link to="/">Book library</Link>
        </h1>
      </div>
      <div className="flex-col-reverse">
        {token ? (
          <ul className="menu menu-horizontal mr-8">
            <li>
              <details>
                <summary>Your info</summary>
                <ul className="p-2 bg-accent border-primary border-2 z-10">
                  <li>
                    <Link to="/">All Book's</Link>
                  </li>
                  <li>
                    <Link to="/my-book">My Book's</Link>
                  </li>
                  <li>
                    <Link to="/add-book">Add New Book</Link>
                  </li>
                  <li>
                    <Link to="/my-profile">My Profile</Link>
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

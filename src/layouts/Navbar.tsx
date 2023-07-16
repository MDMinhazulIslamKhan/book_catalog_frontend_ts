import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navbar bg-accent">
      <div className="flex-1">
        <Link to="/">
          <img className="ml-3 w-20" src="/logo.png" alt="logo" />
        </Link>
      </div>
      <div className="flex-none">
        <div className="form-control mr-4">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2 bg-accent border-primary border-2">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <Link to="/login">Login</Link>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;

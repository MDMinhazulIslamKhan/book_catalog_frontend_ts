import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="w-full h-20 bg-purple-100">
      <Link to="/">
        <img src="/logo.png" className="h-full p-3" alt="logo" />
      </Link>
    </div>
  );
};

export default Navbar;

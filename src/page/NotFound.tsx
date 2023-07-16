import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-screen bg-purple-100 py-20">
      <h1 className="text-center font-extrabold text-4xl">
        Page is not found.
      </h1>
      <Link to="/">
        <h5 className="text-center font-bold text-xl mt-5 text-purple-900">
          Go to home
        </h5>
      </Link>
    </div>
  );
};

export default NotFound;

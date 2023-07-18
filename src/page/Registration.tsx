import { FormEvent, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setToken } from "../redux/features/user/userSlice";

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  let errorMassage;
  const [postLogin, options] = useRegistrationMutation();

  const { error, isLoading, isSuccess, data } = options;
  errorMassage = error?.data?.message;

  if (isLoading) {
    errorMassage = (
      <span className="loading loading-spinner text-primary"></span>
    );
  }
  if (isSuccess) {
    localStorage.setItem("accessToken", data?.data?.token);
    dispatch(setToken(data?.data?.token));
    navigate("/");
  }
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const firstName = e?.target?.firstName?.value;
    const lastName = e?.target?.lastName?.value;
    const email = e?.target?.email?.value;
    const password = e?.target?.password?.value;
    const option = { email, password, name: { firstName, lastName } };
    postLogin(option);
  };

  return (
    <div className="flex justify-center mt-8">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-center font-bold text-xl my-3">Registration</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                name="firstName"
                placeholder="First Name"
                autoComplete="off"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                name="lastName"
                placeholder="Last Name"
                autoComplete="off"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                placeholder="Your Email"
                autoComplete="off"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Your Password"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className={`form-control ${!errorMassage && "mt-6"}`}>
              <p className="text-red-600 my-2 text-center">{errorMassage}</p>
              <button
                type="submit"
                className="btn btn-secondary text-white font-bold"
              >
                Registration
              </button>
            </div>
          </form>
          <small>
            Already have an account?{"    "}
            <Link className="text-primary" to="/login">
              Login
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};
export default Registration;

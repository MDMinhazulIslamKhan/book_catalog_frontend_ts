import { FormEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegistrationMutation } from "../redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setToken } from "../redux/features/user/userSlice";
import { IApiError } from "../types";

const Registration = () => {
  const [showPassword, handleShowPassWord] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  });

  let errorMassage;
  const [postLogin, options] = useRegistrationMutation();

  const { error, isLoading, isSuccess, data } = options;

  const apiError = error as IApiError;

  errorMassage = apiError?.data?.message;

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
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const firstName = form?.firstName?.value;
    const lastName = form?.lastName?.value;
    const email = form?.email?.value;
    const password = form?.password?.value;
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
                minLength={4}
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
                minLength={4}
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
                type="email"
                autoComplete="off"
                required
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Password</span>
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="inline-block ml-5 w-5 h-5"
                    onClick={() => handleShowPassWord(!showPassword)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="inline-block ml-5 w-5 h-5"
                    onClick={() => handleShowPassWord(!showPassword)}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                    />
                  </svg>
                )}
              </label>
              <input
                type={showPassword ? "text" : "password"}
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

/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { FormEvent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/features/user/userApi";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { setToken } from "../redux/features/user/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { token } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [navigate, token]);

  let errorMassage;
  const [postLogin, options] = useLoginMutation();

  const { isSuccess, data } = options;

  if (isSuccess) {
    localStorage.setItem("accessToken", data?.data?.token);
    dispatch(setToken(data?.data?.token));
    navigate("/");
  }
  const handleSubmit = (e: any) => {
    e.preventDefault();
    const email = e?.target?.email?.value;
    const password = e?.target?.password?.value;
    const option = { email, password };
    postLogin(option);
  };

  return (
    <div className="flex justify-center my-8">
      <div className="card w-full max-w-sm shadow-2xl bg-base-100">
        <div className="card-body">
          <h2 className="text-center font-bold text-xl my-3">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                name="email"
                autoComplete="off"
                required
                placeholder="Your Email"
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
                className="input input-bordered w-full max-w-xs"
              />
            </div>
            <div className={`form-control ${!errorMassage && "mt-6"}`}>
              <p className="text-red-600 my-2 text-center">{errorMassage}</p>
              <button
                type="submit"
                className="btn btn-secondary text-white font-bold"
              >
                Login
              </button>
            </div>
          </form>
          <small>
            New to Book Library?{"    "}
            <Link className="text-primary" to="/registration">
              Create new account
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};
export default Login;

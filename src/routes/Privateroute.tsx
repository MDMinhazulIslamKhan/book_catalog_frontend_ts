import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hook";

interface IProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: IProps) {
  const { token, isLoading } = useAppSelector((state) => state.user);

  const { pathname } = useLocation();

  if (isLoading) {
    return <span className="loading loading-spinner text-primary"></span>;
  }

  if (!token && !token) {
    return <Navigate to="/login" state={{ path: pathname }} />;
  }

  return children;
}

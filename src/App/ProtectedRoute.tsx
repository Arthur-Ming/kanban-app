import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router';

type Props = {
  children?: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  const token = Cookies.get('token') || null;

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;

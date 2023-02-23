import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router';

type Props = {
  children?: JSX.Element;
};

const ProtectedRoute = ({ children }: Props) => {
  console.log('!!!');
  /*  const token = Cookies.get('token') || null;
  console.log('!!!');
  if (!token) {
    return <Navigate to="/signin" replace />;
  } */

  return children ? children : <Outlet />;
};

export default ProtectedRoute;

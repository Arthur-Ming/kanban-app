import { IFetchError } from 'interfaces';
import { FallbackProps } from 'react-error-boundary';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import { toast } from 'react-toastify';
import { logout } from 'redux/reducer/session';
import { loggedUserSelector } from 'redux/selectors/session';

const PageErrorFallback = ({ error }: FallbackProps) => {
  const loggedUser = useSelector(loggedUserSelector);
  const dispatch = useDispatch();

  const errorStatus = (error as unknown as IFetchError)?.status;

  if (errorStatus === 401 || errorStatus === 403) {
    toast('you need to log in!', {
      toastId: errorStatus,
    });
    loggedUser && dispatch(logout());

    return <Navigate to={`/login`} />;
  }
  return (
    <div role="alert">
      <div>Oh no</div>
      <pre>{(error as unknown as { data: string })?.data}</pre>
    </div>
  );
};
export default PageErrorFallback;

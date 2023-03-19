import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import Header from 'components/Header';

import { useErrorHandler, withErrorBoundary } from 'react-error-boundary';
import { IFetchError } from 'interfaces';
import { useUserByIdQuery } from 'redux/api/users';
import { getUserId } from 'utils/cookies';

const App = () => {
  useUserByIdQuery(getUserId());

  return (
    <div className="wrapper">
      <Router>
        <Header />
        <AppRoutes />
      </Router>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default withErrorBoundary(App, {
  FallbackComponent: ({ error, resetErrorBoundary }) => {
    const errorStatus = (error as unknown as IFetchError)?.status;

    if (errorStatus === 401 || errorStatus === 403) {
      toast.error('неверные учетные данные!', {
        toastId: errorStatus,
      });
    }
    return (
      <div className="wrapper">
        <Router>
          <Header />
          <AppRoutes />
        </Router>
        <ToastContainer position="bottom-right" />
      </div>
    );
  },
});
/* export default App; */

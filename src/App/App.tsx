import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from 'components/Header';
import { useLazyUserByIdQuery } from 'redux/api/users';
import { getUserId } from 'utils/cookies';
import { useEffect } from 'react';

const App = () => {
  const [getUserById] = useLazyUserByIdQuery();

  useEffect(() => {
    try {
      getUserById(getUserId());
    } catch (error) {}
  }, [getUserById]);

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

export default App;

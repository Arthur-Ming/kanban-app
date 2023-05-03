import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from 'components/Header';
import { useGetUserQuery } from 'redux/api/auth';

const App = () => {
  useGetUserQuery();
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

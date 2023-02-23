import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from 'components/Header';
import useAuth from 'hooks/useAuth';

const App = () => {
  useAuth();
  return (
    <div className="wrapper">
      <Router>
        <Header />
        <AppRoutes />
      </Router>
      <ToastContainer />
    </div>
  );
};

export default App;

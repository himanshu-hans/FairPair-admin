import { BrowserRouter as Router } from "react-router-dom";
import Approute from './routes/AppRoute';
import './App.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
    <Router>
      <Approute/>
    </Router>
    <ToastContainer/>
    </>
  );
}

export default App;

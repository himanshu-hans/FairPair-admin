import logo from './logo.svg';
import { BrowserRouter as Router } from "react-router-dom";
import Approute from './routes/AppRoute';
import './App.css'


function App() {
  return (
    <>
    <Router>
      <Approute/>
    </Router>
    </>
  );
}

export default App;

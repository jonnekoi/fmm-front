import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './home.jsx';
const App = () => {
  return (
      <Router>
        <Routes>
            <Route index element={<Home/>}/>
        </Routes>
      </Router>
  );
};

export default App;

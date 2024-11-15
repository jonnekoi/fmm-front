import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './components/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Profile from './components/Profile.jsx';
import Matches from './components/Matches.jsx';
import PointsPage from './components/PointsPage.jsx';
import Admin from './components/Admin.jsx';

const App = () => {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="matches" element={<Matches />} />
              <Route path="leaderboard" element={<PointsPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="/admin" element={<Admin/>} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
  );
};

export default App;

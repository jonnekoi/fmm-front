import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Pages/Layout.jsx';
import Home from './components/Pages/Home.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Profile from './components/Profile.jsx';
import Matches from './components/Pages/Matches.jsx';
import PointsPage from './components/Pages/PointsPage.jsx';
import Admin from './components/Pages/Admin.jsx';
import LeaguePage from './components/Pages/LeaguePage.jsx';
import SingleLeaguePage from './components/SingleLeaguePage.jsx';

const App = () => {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="leagues" element={<LeaguePage />} />
              <Route path="matches" element={<Matches />} />
              <Route path="leaderboard" element={<PointsPage />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="/admin" element={<Admin/>} />
              <Route path="/league/:id" element={<SingleLeaguePage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
  );
};

export default App;

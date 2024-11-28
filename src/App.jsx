import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Pages/Layout.jsx';
import Home from './components/Pages/Home.jsx';
import Register from './components/LoginRegisterComponents/Register.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import Profile from './components/LoginRegisterComponents/Profile.jsx';
import PointsPage from './components/Pages/PointsPage.jsx';
import Admin from './components/Pages/Admin.jsx';
import LeaguePage from './components/Pages/LeaguePage.jsx';
import MatchPage from './components/Pages/MatchPage.jsx';
import SingleLeaguePage from './components/Pages/SingleLeaguePage.jsx';
import LoginPage from './components/Pages/LoginPage.jsx';

const App = () => {
  return (
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="leagues" element={<LeaguePage />} />
              <Route path="leaderboard" element={<PointsPage />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<Register />} />
              <Route path="profile" element={<Profile />} />
              <Route path="/admin" element={<Admin/>} />
              <Route path="/league/:id" element={<SingleLeaguePage />} />
              <Route path="/match/:id" element={<MatchPage />} />
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
  );
};

export default App;

import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import HamburgerMenu from '../assets/hamburgerMenu.svg';
import {useState} from 'react';



const handleLogout = (navigate) => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('username');
  sessionStorage.removeItem('email');
  sessionStorage.removeItem('name');
  sessionStorage.removeItem('id');
  navigate('/');
  location.reload();
}

const Layout = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [hamburgerMenu, setHamburgerMenu] = useState(false);

  const toggleHamburgerMenu = () => {
    setHamburgerMenu(prevState => !prevState);
  };

  const getUsername = () => sessionStorage.getItem('username');

  return (
      <>
        <header className="bg-slate-900 w-auto p-7 m-1 mx-auto border-b border-white flex items-center justify-between">
          <div className="text-3xl font-bold text-slate-200 ml-4">
            <h1 className="font-myFont text-6xl">Etusivu</h1>
          </div>
          <div className="">
            {isLoggedIn ? (
                <>
                  <img onClick={toggleHamburgerMenu} className="hidden hamburger-icon" src={HamburgerMenu} alt="Hamburger Menu"/>
                  <div className="flex space-x-7 mr-4 header-links">
                    <div
                        className="text-5xl text-slate-200 font-myFont mr-6">Welcome, {getUsername()}!</div>
                    <Link to="/"
                          className="text-5xl text-slate-200 font-myFont hover:underline">Home</Link>
                    <Link to="/leagues"
                          className="text-5xl text-slate-200 font-myFont hover:underline">Leagues</Link>
                    <Link to="/leaderboard"
                          className="text-5xl text-slate-200 font-myFont hover:underline">Leaderboard</Link>
                    <Link to="/profile"
                          className="text-5xl text-slate-200 font-myFont hover:underline">Account</Link>
                    <button onClick={(e) => handleLogout(navigate)}
                            className="text-5xl text-slate-200 font-myFont hover:underline">Logout
                    </button>
                  </div>
                </>
            ) : (
                <div className="space-x-7">
                  <Link to="/login" className="text-5xl text-slate-200 font-myFont hover:underline">Login</Link>
                  <Link to="/register" className="text-5xl text-slate-200 font-myFont hover:underline">Register</Link>
                </div>
            )}
          </div>
        </header>
        <div className={`flex flex-col m-5 border-b ${hamburgerMenu
            ? 'block'
            : 'hidden'}`}>
          <Link
              to="/"className="text-5xl text-slate-200 font-myFont">H o m e</Link>
          <Link to="/matches"
                className="text-5xl text-slate-200 font-myFont">M a t c h e s</Link>
          <Link to="/leaderboard"
                className="text-5xl text-slate-200 font-myFont hover:underline">L e a d e r b o a r d</Link>
          <Link to="/profile"
                className="text-5xl text-slate-200 font-myFont">A c c o u n t</Link>
          <button onClick={(e) => handleLogout(navigate)}
                  className="text-5xl text-slate-200 font-myFont hover:underline mb-5">L o g o u t
          </button>
        </div>
        <main>
          <Outlet/>
        </main>
      </>
  );
};

export default Layout;

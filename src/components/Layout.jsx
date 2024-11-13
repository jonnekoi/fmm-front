import { Link, Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';


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

  const getUsername = () => sessionStorage.getItem('username');

  return (
      <>
        <header className="bg-slate-900 w-auto p-7 m-1 mx-auto border-b border-white flex items-center justify-between">
          <div className="text-3xl font-bold text-slate-200 ml-4">
            <h1 className="font-myFont text-6xl">Etusivu</h1>
          </div>
          <div className="flex space-x-7 mr-4">
            {isLoggedIn ? (
                <>
                  <div
                      className="text-5xl text-slate-200 font-myFont mr-6">Welcome, {getUsername()}</div>
                  <Link to="/"
                        className="text-5xl text-slate-200 font-myFont hover:underline">Home</Link>
                  <Link to="/matches"
                        className="text-5xl text-slate-200 font-myFont hover:underline">Matches</Link>
                  <Link to="/profile"
                        className="text-5xl text-slate-200 font-myFont hover:underline">Account</Link>
                  <button onClick={(e) => handleLogout(navigate)}
                          className="text-5xl text-slate-200 font-myFont hover:underline">Logout
                  </button>
                </>
            ) : (
                <>
                  <Link to="/login" className="text-5xl text-slate-200 font-myFont hover:underline">Login</Link>
                  <Link to="/register" className="text-5xl text-slate-200 font-myFont hover:underline">Register</Link>
                </>
            )}
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </>
  );
};

export default Layout;

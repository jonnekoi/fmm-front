const Home = () => {
  return (
      <>
        <header className="bg-slate-900 w-auto p-7 m-1 mx-auto border-b border-white flex items-center justify-between">
          <div className="text-3xl font-bold text-slate-200 ml-4">
            <h1>Etusivu</h1>
          </div>
          <div className="flex space-x-6 mr-4">
            <button className="text-2xl text-slate-200 font-calligraphy hover:underline ">Login</button>
            <button className="text-2xl text-slate-200 font-calligraphy hover:underline ">Register</button>
          </div>
        </header>
      </>
  );
};


export default Home;

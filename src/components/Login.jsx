const Login = () => {
  return (
      <div className="w-1/5 m-auto border mt-10 p-5 rounded">
        <form className="flex flex-col m-auto w-3/4">
          <label className="font-myFont text-3xl">Username</label>
          <input className="m-2 bg-white rounded text-black" type="text" name="username"/>
          <label className="font-myFont text-3xl">Password</label>
          <input className="m-2 bg-white rounded text-black" type="password" name="password"/>
          <button className="font-myFont text-5xl hover:underline" type="submit">Login</button>
        </form>
      </div>
  );
};

export default Login;

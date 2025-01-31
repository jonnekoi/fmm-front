// eslint-disable-next-line react/prop-types
const UsersList = ({ users }) => {
  return (
      <div className="flex flex-col bg-slate-900 m-5 league-data-component users-list-mobile">
        <h1 className="font-myFont text-6xl pb-10">Users and Points</h1>
        {users.map((user) => (
            <div key={user.id} className="font-semibold text-3xl">
              <span className="font-semibold">{user.name} </span>
              <span className="font-mono">{user.points}</span>
            </div>
        ))}
      </div>
  );
};

export default UsersList;

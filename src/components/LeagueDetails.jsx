// eslint-disable-next-line react/prop-types
const LeagueDetails = ({ league }) => {
  return (
      <div className="flex flex-col bg-slate-900 m-5 league-data-component league-details-mobile">
        <h1 className="font-myFont text-6xl pb-10">League Details</h1>
        <h2 className="font-semibold text-3xl">League Name: {league.name}</h2>
        <p className="font-semibold text-3xl">
          Max Players: {league.league_users.length} / {league.maxPlayers}
        </p>
        <p className="font-semibold text-3xl">Owner: {league.owner_username}</p>
        <p className="text-1xl p-5">{league.desci}</p>
      </div>
  );
};

export default LeagueDetails;

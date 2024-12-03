import SingleLeague from '../SingleLeague.jsx';

const SingleLeaguePagePublic = () => {
  return (
      <>
        <button className="join-button bg-buttonColor mt-5">Join
          League
        </button>
        <div className="flex justify-center m-5 leagues-mobile">
          <SingleLeague></SingleLeague>
        </div>
      </>
  );
};

export default SingleLeaguePagePublic;

import Leaderboard from '../../NO NEED/Leaderboard.jsx';
import NextMatches from '../NextMatches.jsx';

const Home = () => {
  return (
      <div className="flex justify-center m-5 matches-mobile">
        <NextMatches></NextMatches>
        <Leaderboard></Leaderboard>
      </div>
  );
}

export default Home;

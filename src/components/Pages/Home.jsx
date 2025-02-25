import NextMatches from '../NextMatches.jsx';
import Scores from '../Scores.jsx';


const Home = () => {
  return (
      <div className="grid grid-flow-col m-5 mt-7 home-mobile">
        <div className="home-mobile">
          <NextMatches/>
        </div>
        <div className="home-mobile">
          <Scores/>
        </div>
      </div>
  );
}

export default Home;

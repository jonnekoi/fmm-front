import HomePageIcons from '../HomePageIcons.jsx';
import NextMatches from '../NextMatches.jsx';
import Scores from '../Scores.jsx';

const Home = () => {
  return (
      <div className="grid grid-cols-4 m-5 mt-7 home-mobile">
        <div className="col-span-2 home-mobile-icons">
          <HomePageIcons/>
        </div>
        <div className="col-span-2 home-mobile">
          <NextMatches/>
        </div>
        <div className="col-span-2 col-start-3 home-mobile">
          <Scores/>
        </div>
      </div>
  );
}

export default Home;

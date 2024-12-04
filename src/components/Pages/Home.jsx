import HomePageIcons from '../HomePageIcons.jsx';
import NextMatches from '../NextMatches.jsx';

const Home = () => {
  return (
      <div className="grid grid-cols-4 gap-4 home-mobile">
        <div className="col-span-2 home-mobile">
          <HomePageIcons/>
        </div>
        <div className="col-span-2 home-mobile">
          <NextMatches/>
        </div>
        <div className="col-span-4 home-mobile">
          <NextMatches/>
        </div>
      </div>
  );
}

export default Home;

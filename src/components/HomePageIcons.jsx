import Leagues from '../assets/Leagues.svg';
import Account from '../assets/Account.svg';
import {Link} from 'react-router-dom';

const HomePageIcons = () => {
  return (
      <div className="flex justify-center icons-mobile">
        <Link to="/leagues">
        <img src={Leagues} width="150" height="150" alt="Leagues"
             className="m-5"/>
        </Link>
        <Link to="/profile">
        <img src={Account} width="150" height="150" alt="Account"
             className="m-5"/>
        </Link>
      </div>
  );
}

export default HomePageIcons;

import Leagues from '../assets/Leagues.svg';
import Account from '../assets/Account.svg';

const HomePageIcons = () => {
  return (
      <div className="flex justify-center icons-mobile">
        <img src={Leagues} width="150" height="150" alt="Leagues"
             className="m-5"/>
        <img src={Account} width="150" height="150" alt="Account"
             className="m-5"/>
        <img src={Account} width="150" height="150" alt="Account"
             className="m-5"/>
        <img src={Account} width="150" height="150" alt="Account"
             className="m-5"/>
      </div>
  );
}

export default HomePageIcons;

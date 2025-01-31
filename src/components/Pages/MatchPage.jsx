import SingleMatchPage from '../SingleMatchPage.jsx';
import TeamStats from '../TeamStats.jsx';

const MatchPage = () => {
  return (
      <>
        <div className="flex m-5 MatchPage-mobile">
          <SingleMatchPage></SingleMatchPage>
          <TeamStats></TeamStats>
        </div>
      </>
  );
};


export default MatchPage;

import SingleMatchPage from '../SingleMatchPage.jsx';
import TeamStats from '../TeamStats.jsx';

const MatchPage = () => {
  return (
      <>
        <div className="flex m-5 match-page-mobile">
          <SingleMatchPage></SingleMatchPage>
          <TeamStats></TeamStats>
        </div>
      </>
  );
};


export default MatchPage;

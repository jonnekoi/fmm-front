import MatchesTable from './MatchesTable.jsx';

const Matches = () => {
  return (
      <>
        <div className="flex justify-center m-5 matches-mobile">
          <MatchesTable></MatchesTable>
          <MatchesTable></MatchesTable>
        </div>
      </>
  );
};


export default Matches;

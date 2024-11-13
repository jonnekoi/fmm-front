import MatchesTable from './MatchesTable.jsx';

const Matches = () => {
  return (
      <>
        <div className="flex flex-row space-x-6 m-5 matches-mobile">
          <MatchesTable></MatchesTable>
          <MatchesTable></MatchesTable>
          <MatchesTable></MatchesTable>
        </div>
      </>
  );
};


export default Matches;

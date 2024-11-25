// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import MatchesTable from './MatchesTable.jsx';
import SingleMatch from './SingleMatch.jsx';

const Matches = () => {
  const [selectedMatchId, setSelectedMatchId] = useState(null);

  return (
      <div className="flex justify-center m-5 matches-mobile">
        <MatchesTable setSelectedMatchId={setSelectedMatchId} />
        <SingleMatch matchId={selectedMatchId} />
      </div>
  );
};

export default Matches;

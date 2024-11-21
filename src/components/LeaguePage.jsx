// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import AllLeagues from './AllLeagues.jsx';
import ManageLeagues from './ManageLeagues.jsx';

const LeaguePage = () => {

  return (
      <div className="flex justify-center m-5">
          <ManageLeagues></ManageLeagues>
          <AllLeagues></AllLeagues>
      </div>
  );
};

export default LeaguePage;

const MatchesTable = () => {
  return (
      <div className="w-1/5 flex flex-col">
        <h1 className="font-myFont text-6xl">Matches</h1>
          <div className="bg-slate-900 m-auto w-full border mt-5">
            <table className="w-full">
              <thead>
              <tr className="">
                <th className="p-2 border">Match Date</th>
                <th className="p-2 border">Home</th>
                <th className="p-2 border">Away</th>
                <th className="p-2 border">Score</th>
              </tr>
              </thead>
              <tbody>
              <tr>
                <td className="p-2 border">Joukkue A</td>
                <td className="p-2 border">Joukkue B</td>
                <td className="p-2 border">0</td>
                <td className="p-2 border">0</td>
              </tr>
              </tbody>
            </table>
          </div>
      </div>
  );
};

export default MatchesTable;

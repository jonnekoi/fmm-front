import React, { useState, useEffect } from 'react';

const url = 'http://127.0.0.1:3000/v1';

const fetchPoints = async (setPoints) => {
  try {
    const response = await fetch(url + '/users/points');
    const responseData = await response.json();
    setPoints(responseData);
  } catch (error) {
    console.error('Error fetching matches:', error);
  }
}

const Leaderboard = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    fetchPoints(setPoints);
  }, []);


  return (
      <div className="bg-slate-900 points-table flex flex-col w-full">
        <h1 className="font-myFont text-6xl">Points</h1>
        <div className="m-auto w-full ">
          <table className="w-full">
            <thead>
            <tr>
              <th className="p-3 poppins-font border-b border-white">Username</th>
              <th className="p-3 poppins-font border-b border-white">Points</th>
            </tr>
            </thead>
            <tbody>
            {points
            .map(point => ({ ...point, points: point.points ?? 0 }))
            .sort((a, b) => b.points - a.points)
            .slice(0, 5)
            .map((point, index) => (
                <tr key={index} className="cursor-pointer tr-alin">
                  <td className="p-3 poppins-font border-b border-white">{point.username}</td>
                  <td className="p-3 poppins-font border-b border-white">{point.points}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default Leaderboard;


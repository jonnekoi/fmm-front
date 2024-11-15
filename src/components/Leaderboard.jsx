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
      <div className="w-2/6 flex flex-col m-3 points-table-mobile">
        <h1 className="font-myFont text-6xl">Points</h1>
        <div className="bg-slate-900 m-auto w-full border mt-5">
          <table className="w-full">
            <thead>
            <tr>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Points</th>
            </tr>
            </thead>
            <tbody>
            {points
            .map(point => ({ ...point, points: point.points ?? 0 }))
            .sort((a, b) => b.points - a.points)
            .slice(0, 5)
            .map((point, index) => (
                <tr key={index}>
                  <td className="p-2 border">{point.username}</td>
                  <td className="p-2 border">{point.points}</td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default Leaderboard;


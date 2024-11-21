import {useEffect, useState} from 'react';

const url = 'http://127.0.0.1:3000/v1';

const fetchLeagues = async (setLeagues) => {
  const fetchOption = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
  }
  try {
    const response = await fetch(url + '/leagues', fetchOption);
    const responseData = await response.json();
    setLeagues(responseData);
  } catch (error) {
    console.error('Error fetching leagues:', error);
  }
}


const AllLeagues = () => {
    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        fetchLeagues(setLeagues);
    }, []);

    return (
        <div>
            <h1 className="font-myFont text-6xl pb-5">Your Leagues</h1>
            <table>
              <thead>
              <tr>
                <th className="p-2 border">League Name</th>
                <th className="p-2 border">Max Players</th>
                <th className="p-2 border">Owner</th>
              </tr>
              </thead>
              <tbody>
              {leagues.map((league) => (
                  <tr key={league.id}>
                    <td className="p-2 border">{league.name}</td>
                    <td className="p-2 border">{league.maxPlayers}</td>
                    <td className="p-2 border">{league.owner_username}</td>
                  </tr>
              ))}
              </tbody>
            </table>
        </div>
    );
}

export default AllLeagues;

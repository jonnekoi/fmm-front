import {useEffect, useState} from "react";

const url = 'http://127.0.0.1:3000/v1';

// This renders table of all public leagues

const fetchleagues = async (setLeagues) => {
    try {
        const response = await fetch(url + '/leagues/public');
        const responseData = await response.json();
        setLeagues(responseData);
    } catch (error) {
        console.error('Error fetching leagues:', error);
    }
}

const addUserToPublicLeague = async (event, id) => {
    event.preventDefault();

    const fetchOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
        }
    };

    try {
        const response = await fetch(url + `/leagues/add/${id}`, fetchOptions);
        if (response.ok) {
            location.reload();
        }
    } catch (error) {
        console.log(error);
    }
};

const PublicLeagues = () => {
    const [leagues, setLeagues] = useState([]);

    useEffect(() => {
        fetchleagues(setLeagues);
    }, []);

    return (
        <div className="m-5">
            <h1 className="font-myFont text-6xl pb-5">Public Leagues</h1>
            <table className="bg-slate-900">
                <thead>
                <tr>
                    <th className="p-2 border">League Name</th>
                    <th className="p-2 border">Max Players</th>
                    <th className="p-2 border">Owner</th>
                    <th className="p-2 border">Info</th>
                    <th className="p-3 border">Join</th>
                </tr>
                </thead>
                <tbody>
                {leagues.map((league) => (
                    <tr key={league.id}>
                        <td className="p-2 border">{league.name}</td>
                        <td className="p-2 border">{league.maxPlayers}</td>
                        <td className="p-2 border">{league.owner_username}</td>
                        <td className="p-2 border">
                            <span className="info-icon cursor-pointer text-center p-2 relative text-2xl">&#x2139;
                                <span
                                    className="text-sm tooltip-text absolute hidden w-32 bg-gray-700 text-white text-center rounded-lg p-2 bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 transition-opacity duration-300">
                                        {league.desci}
                                </span>
                            </span>
                        </td>
                        <td className="p-4 border hover:bg-white relative">
                            <button
                                className="absolute inset-0 text-2xl text-slate-200 hover:bg-white hover:text-black"
                                onClick={(e) => addUserToPublicLeague(e,
                                    league.id)}>Join
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PublicLeagues;

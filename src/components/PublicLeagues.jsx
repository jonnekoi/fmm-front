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
        <div className="m-5 bg-slate-900 your-leagues">
            <h1 className="font-myFont text-6xl pb-5">Public Leagues</h1>
            <table className="bg-slate-900 your-leagues">
                <thead>
                <tr>
                    <th className="p-3 poppins-font border-b border-white">League Name</th>
                    <th className="p-3 poppins-font border-b border-white">Max Players</th>
                    <th className="p-3 poppins-font border-b border-white">Owner</th>
                </tr>
                </thead>
                <tbody>
                {leagues.map((league) => (
                    <tr key={league.id} className="cursor-pointer tr-alin">
                        <td className="p-3 poppins-font border-b border-white">{league.name}</td>
                        <td className="p-3 poppins-font border-b border-white">{league.maxPlayers}</td>
                        <td className="p-3 poppins-font border-b border-white">{league.owner_username}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PublicLeagues;

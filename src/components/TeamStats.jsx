import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {Bars} from 'react-loader-spinner';

const url = 'http://127.0.0.1:3000/v1';

const TeamStats = () => {
  const {id: matchId} = useParams();
  const[match, setMatch] = useState(null);
  const[stats, setStats] = useState(null);

  const getMatch = async (matchId) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
    };
    try {
      const response = await fetch(url + `/matches/${matchId}`, fetchOptions);
      const responseData = await response.json();
      setMatch(responseData);
    } catch (error) {
      console.error('Error fetching match:', error);
    }
  };

  const getTeamStats = async (matchId) => {
    const fetchOptions = {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
      }
    };
    try {
      const response = await fetch(url + `/matches/stats/${matchId}`, fetchOptions);
      const responseData = await response.json();
      setStats(responseData);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };


  useEffect(() => {
    getMatch(matchId);
    getTeamStats(matchId);
  }, [matchId])

  if (!match || !stats) {
    return (
        <Bars
            height="80"
            width="80"
            color="#ffff"
            ariaLabel="bars-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    )
  }

  const HomeTeamTotalMatches = parseInt(stats[0].losses) + parseInt(stats[0].wins) + parseInt(stats[0].ties);
  const HomeTeamGoalsScored = parseInt(stats[0].goals_scored);
  const HomeAverageGoals = parseFloat((HomeTeamGoalsScored / HomeTeamTotalMatches).toFixed(2));

  const AwayTeamTotalMatches = parseInt(stats[1].losses) + parseInt(stats[1].wins) + parseInt(stats[1].ties);
  const AwayTeamGoalsScored = parseInt(stats[1].goals_scored);
  const AwayAverageGoals = parseFloat((AwayTeamGoalsScored / AwayTeamTotalMatches).toFixed(2));

  return (
      <div className="w-1/2 m-5">
        <div className="bg-slate-900 single-match m-5 w-full p-4">
          <h1 className="poppins-font font-bold text-1xl p-4">{match.home_team}</h1>
          <div className="flex justify-between">
            <span className="poppins-font">Average goals</span>
            <span className="poppins-font">{HomeAverageGoals}</span>
          </div>
          <div className="flex justify-between">
            <span className="poppins-font">Wins</span>
            <span className="poppins-font">{stats[0].wins}</span>
          </div>
          <div className="flex justify-between">
            <span className="poppins-font">Ties</span>
            <span className="poppins-font">{stats[0].ties}</span>
          </div>
          <div className="flex justify-between">
            <span className="poppins-font">Losses</span>
            <span className="poppins-font">{stats[0].losses}</span>
          </div>
          <div className="flex justify-between">
            <span className="poppins-font">Best Scorer</span>
            <span className="poppins-font">TO BE IMPLEMENTED</span>
          </div>
          <h1 className="poppins-font font-bold text-1xl p-4">{match.away_team}</h1>
          <div className="flex justify-between">
            <span className="poppins-font">Average goals</span>
            <span className="poppins-font">{AwayAverageGoals}</span>
          </div>
          <div className="flex justify-between">
            <span className="poppins-font">Wins</span>
            <span className="poppins-font">{stats[1].wins}</span>
          </div>
          <div className="flex justify-between">
            <span className="poppins-font">Ties</span>
            <span className="poppins-font">{stats[1].ties}</span>
          </div>
          <div className="flex justify-between">
            <span className="poppins-font">Losses</span>
            <span className="poppins-font">{stats[1].losses}</span>
          </div>
          <div className="flex justify-between">
            <span className="poppins-font">Best Scorer</span>
            <span className="poppins-font">TO BE IMPLEMENTED</span>
          </div>
        </div>
      </div>
  )
}

export default TeamStats;

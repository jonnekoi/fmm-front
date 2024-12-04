import SingleLeague from '../SingleLeague.jsx';
import {useParams} from 'react-router-dom';
import {useState} from 'react';

const url = 'http://127.0.0.1:3000/v1';


const SingleLeaguePagePublic = () => {
  const { id: leagueId } = useParams();
  const [addText, setAddText] = useState('');
  const [isButtonVisible, setIsButtonVisible] = useState(true);

  const addUserToPublicLeague = async (id) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      }
    };

    try {
      const response = await fetch(url + `/leagues/add/${id}`, fetchOptions);
      if (response.status === 201) {
        setAddText('Successfully joined league');
        setIsButtonVisible(false);
      } else {
        setAddText('Failed to join league');
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(leagueId);
  return (
      <>
        <div>
          {addText && <p className="text-white font-myFont text-6xl">{addText}</p>}
          {isButtonVisible && (
          <button onClick={() => addUserToPublicLeague(leagueId)} className="join-button bg-buttonColor mt-5">Join League</button>
          )}
        </div>
        <div className="flex justify-center m-5 leagues-mobile">
          <SingleLeague></SingleLeague>
        </div>
      </>
  );
};

export default SingleLeaguePagePublic;

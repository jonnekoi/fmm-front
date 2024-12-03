import {useEffect, useState} from 'react';
import ReactMarkdown from 'react-markdown';

const url = 'http://127.0.0.1:3000/v1';

// This renders joining and creating leagues to LeaguePage

const ManageLeagues = () => {
  const [isPublic, setIsPublic] = useState('true');
  const [errorMessage, setErrorMessage] = useState('');
  const [addErrorMessage, setAddErrorMessage] = useState('');
  const [showCreateLeague, setShowCreateLeague] = useState(false);
  const [showJoinLeague, setShowJoinLeague] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [markdownContent, setMarkdownContent] = useState('');

  useEffect(() => {
    const fetchMarkdownContent = async () => {
      try {
        const response = await fetch('/src/assets/content.md');
        const text = await response.text();
        setMarkdownContent(text);
      } catch (error) {
        console.error('Error loading markdown file:', error);
      }
    };

    fetchMarkdownContent();
  }, []);

  const handleSelectChange = (event) => {
    setIsPublic(event.target.value);
  };

  const handleAddLeague = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const data = Object.fromEntries(formdata);
    console.log(data);
    if (data.isPublic === 'true') {
      delete data.leagueKey;
    }

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
      body: JSON.stringify(data),
    };
    try {
      const response = await fetch(url + '/leagues', fetchOptions);
      if (response.status === 409) {
        setAddErrorMessage('Name or key already exist');
      } else if (response.ok) {
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleJoinLeague = async (event) => {
    event.preventDefault();
    const formdata = new FormData(event.target);
    const data = Object.fromEntries(formdata);
    const code = data.leagueCode;
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
      },
    };
    try {
      const response = await fetch(url + `/leagues/${code}`, fetchOptions);
      if (response.status === 409) {
        setErrorMessage('Already in this league');
      } else if (response.ok) {
        location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
      <div className="m-5 w-1/3 manage-leagues-mobile flex flex-col items-center">
        <div className="justify-around mb-5 flex w-full flex-col items-center">
          <button className="button bg-buttonColor m-2" onClick={() => {
            setShowAbout((prevState) => !prevState);
            setShowCreateLeague(false);
            setShowJoinLeague(false);
          }}>About Leagues
          </button>
          <button className="button bg-buttonColor m-2" onClick={() => {
            setShowJoinLeague((prevState) => !prevState);
            setShowCreateLeague(false);
            setShowAbout(false);
          }}
          >
            Join League
          </button>
          <button className="button bg-buttonColor m-2" onClick={() => {
            setShowCreateLeague((prevState) => !prevState);
            setShowJoinLeague(false);
            setShowAbout(false);
          }}
          >
            Create League
          </button>
        </div>

        <div className="w-full">
          {showAbout && (
              <div className="p-5 bg-slate-900 manage-leagues text-white overflow-auto max-h-96">
                {markdownContent ? (
                    <ReactMarkdown>{markdownContent}</ReactMarkdown>
                ) : (
                    <p>Loading markdown content...</p>
                )}
              </div>
          )}
          {showJoinLeague && (
              <form onSubmit={handleJoinLeague} className="flex bg-slate-900 p-5 flex-col m-auto items-center w-3/4 manage-leagues">
                <input className="form-input" type="text" id="leagueCode" name="leagueCode" required placeholder="Enter league code..."/>
                <button className="button" type="submit">
                  Join League
                </button>
                {errorMessage && (
                    <p className="p-2 font-myFont text-3xl text-red-500">
                      {errorMessage}
                    </p>
                )}
              </form>
          )}

          {showCreateLeague && (
              <form
                  onSubmit={handleAddLeague}
                  className="flex items-center bg-slate-900 flex-col w-3/4 m-auto p-5 manage-leagues "
              >
                <input
                    className="form-input"
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Enter league name..."
                />
                <input
                    className="form-input"
                    type="number"
                    id="maxPlayers"
                    name="maxPlayers"
                    required
                    max="60"
                    placeholder="Max players..."
                />
                <label className="poppins-font">Duration</label>
                <select
                    name="duration"
                    id="duration"
                    className="form-input"
                    aria-placeholder=""
                >
                  <option value="7">7 days</option>
                  <option value="30">30 days</option>
                  <option value="60">60 days</option>
                  <option value="120">120 days</option>
                  <option value="365">365 days</option>
                </select>
                <label className="poppins-font">Public league?</label>
                <select
                    name="isPublic"
                    id="isPublic"
                    className="form-input"
                    onChange={handleSelectChange}
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
                {isPublic === 'false' && (
                    <div>
                      <input
                          className="form-input"
                          type="text"
                          id="leagueKey"
                          name="leagueKey"
                          required
                          placeholder="Choose league access key..."
                      />
                    </div>
                )}
                <textarea
                    name="desci"
                    className="form-input"
                    placeholder="League description..."
                ></textarea>
                <button className="button" type="submit">
                  Create League
                </button>
                {addErrorMessage && (
                    <p className="p-2 font-myFont text-3xl text-red-500">
                      {addErrorMessage}
                    </p>
                )}
              </form>
          )}
        </div>
      </div>
  );
};

export default ManageLeagues;

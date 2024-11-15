
const url = 'http://127.0.0.1:3000/v1';

const handleAddMatch = async (event) => {
  event.preventDefault();
  const formdata = new FormData(event.target);
  const data = Object.fromEntries(formdata);

  const fetchOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url + '/matches', fetchOptions);
    const responseData = await response.json();
    if (response.ok) {
      console.log(responseData);
      location.reload();
    }
  } catch (error) {
    console.log(error);
  }

}

  const AddMatch = () => {
    return (
        <div className="w-2/6 flex flex-col m-3 add-match-mobile">
        <h1 className="font-myFont text-6xl">Add Match</h1>
    <div className="bg-slate-900 m-auto w-full border mt-5 p-5 rounded">
          <form onSubmit={handleAddMatch}
                className="flex flex-col m-auto w-3/4">
            <label className="font-myFont text-4xl" htmlFor="homeTeam">Home
              Team</label>
            <input className="m-2 bg-white rounded text-black p-1 text-center" type="text"
                   name="home_team"/>
            <label className="font-myFont text-4xl" htmlFor="awayTeam">Away
              Team</label>
            <input className="m-2 bg-white rounded text-black p-1 text-center" type="text"
                   name="away_team"/>
            <label className="font-myFont text-4xl" htmlFor="date">Day and
              time</label>
            <input className="m-2 bg-white rounded text-black p-1 text-center"
                   type="datetime-local" name="matchday"/>
            <button className="font-myFont mt-10 text-4xl hover:underline"
                    type="submit">Add Match
            </button>
          </form>
        </div>
        </div>
    )
  }

export default AddMatch;


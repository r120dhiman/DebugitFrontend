import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../Api/Context';  

function Vote() {
  const { loginData } = useUser();  
  const [Allpolls, setAllpolls] = useState([]);
  const [selectedVotes, setSelectedVotes] = useState({}); 

  useEffect(() => {
    axios.get('https://debugitbackend.onrender.com/poll/allpolls')
      .then((response) => {
        setAllpolls(response.data);
      })
      .catch((error) => {
        console.log("Got into some error", error);
      });
  }, []);

  const handleVote = async (pollId, selectedOption) => {
    if (!loginData) {
      alert('You need to be logged in to vote');
      return;
    }

    try {
      const response = await axios.post('https://debugitbackend.onrender.com/vote/newvote', {
        pollId,
        userId: loginData.id, 
        selectedOption
      });
      alert('Your vote has been registered!');
    } catch (error) {
      console.error('Error registering vote:', error);
      alert('Error registering your vote');
    }
  };
  
  return (
    <div>
      <h1>Vote your Opinion</h1>
      {Allpolls.length > 0 ? (
        Allpolls.map((poll) => (
          <div key={poll._id} className='bg-amber-950 p-5 w-fit'>
            <h2 className='bg-red-400'>{poll.question}</h2>
            <ul>
              {poll.options.map((option, index) => (
                <li key={index}>
                  <button
                    className='flex flex-row justify-between w-64 '
                    onClick={() => {
                      setSelectedVotes((prevVotes) => ({
                        ...prevVotes,
                        [poll._id]: index, 
                      }));
                    }}
                  >
                    <div className='flex flex-row '>
                    <input
                      type="radio"
                      name={poll._id} 
                      id={`option-${index}-${poll._id}`}
                      checked={selectedVotes[poll._id] === index}
                      onChange={() => {}}
                      className='pr-1.5 '
                    />
                    <h3 className="px-4">{option.optionText}</h3></div>
                    <h4> {option.votes}</h4>
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleVote(poll._id, selectedVotes[poll._id])}
              disabled={selectedVotes[poll._id] === undefined}
              className="mt-2 p-2 bg-blue-500 text-white"
            >
              Vote
            </button>
          </div>
        ))
      ) : (
        <p>No polls available</p>
      )}
    </div>
  );
}

export default Vote;

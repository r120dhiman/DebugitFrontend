import React, { useState, useEffect } from 'react';
import { useUser } from '../Api/Context';
import { useNavigate } from 'react-router-dom';
const API_URL="https://debugitbackend.onrender.com";
const Vote = () => {
  const { loginData } = useUser();
  const navigate = useNavigate();
  const [allPolls, setAllPolls] = useState([]);
  const [selectedVotes, setSelectedVotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/poll/allpolls`)
      .then((response) => response.json())
      .then((data) => {
        setAllPolls(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching polls:", error);
        setError("Failed to load polls");
        setLoading(false);
      });
  }, []);

  const handleVote = async (pollId, selectedOption) => {
    if (!loginData) {
      alert("Please log in to vote.");
      navigate('/login');
      return;
    }

    if (selectedOption === undefined) {
      alert("Please select an option before voting.");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/vote/newvote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pollId,
          userId: loginData.id,
          selectedOption,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to register vote');
      }
      setAllPolls((prevPolls) =>
        prevPolls.map((poll) =>
          poll._id === pollId
            ? {
                ...poll,
                options: poll.options.map((option, index) =>
                  index === selectedOption
                    ? { ...option, votes: option.votes + 1 }
                    : option
                ),
              }
            : poll
        )
      );

      alert('Your vote has been registered!');
    } catch (error) {
      console.error('Error registering vote:', error);
      alert('Error registering your vote');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading polls...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Vote Your Opinion
        </h1>

        {allPolls.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {allPolls.map((poll) => (
              <div 
                key={poll._id} 
                className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">
                    {poll.question}
                  </h2>
                  <ul className="space-y-3">
                    {poll.options.map((option, index) => (
                      <li key={index}>
                        <button
                          className={`w-full p-3 rounded-lg border-2 transition-all duration-200 flex items-center justify-between
                            ${selectedVotes[poll._id] === index 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'}`}
                          onClick={() => {
                            setSelectedVotes((prevVotes) => ({
                              ...prevVotes,
                              [poll._id]: index,
                            }));
                          }}
                        >
                          <div className="flex items-center flex-1">
                            <input
                              type="radio"
                              name={poll._id}
                              checked={selectedVotes[poll._id] === index}
                              onChange={() => {}}
                              className="w-4 h-4 text-blue-500"
                            />
                            <span className="ml-3 text-gray-700">{option.optionText}</span>
                          </div>
                          <span className="ml-4 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                            {option.votes} votes
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => handleVote(poll._id, selectedVotes[poll._id])}
                    disabled={selectedVotes[poll._id] === undefined}
                    className={`mt-4 w-full py-3 rounded-lg font-medium transition-all duration-300
                      ${selectedVotes[poll._id] === undefined
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:shadow-lg hover:shadow-blue-100 transform hover:-translate-y-0.5'}`}
                  >
                    Submit Vote
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <p className="text-gray-600">No polls available at the moment</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Vote;
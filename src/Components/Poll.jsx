import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate } from 'react-router-dom';
import { useUser } from '../Api/Context';

function Poll() {
    const {loginData}=useUser();
    const navigator=useNavigate();

if(!loginData){
    navigator('/login')
}

  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ optionText: '', votes: 0 }]);  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index].optionText = value;
    setOptions(updatedOptions);
  };
  const handleAddOption = () => {
    setOptions([...options, { optionText: '', votes: 0 }]);
  };
  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const response = await axios.post('https://debugitbackend.onrender.com/poll/create', {
        question,
        options,
        userid:loginData.id
      });
      console.log('Poll created successfully:', response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error creating poll:', error);
      setError('There was an error creating the poll.');
      setLoading(false);
    }
  };

  return (
    <div className="poll-container">
      <h1>Create New Poll</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question">Poll Question:</label>
          <input
            type="text"
            id="question"
            value={question}
            onChange={handleQuestionChange}
            required
            placeholder="Enter the poll question"
          />
        </div>
        <div>
          {options.map((option, index) => (
            <div key={index}>
              <label htmlFor={`option-${index}`}>Option {index + 1}:</label>
              <input
                type="text"
                id={`option-${index}`}
                value={option.optionText}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
                placeholder={`Enter option ${index + 1}`}
              />
              <button type="button" onClick={() => handleRemoveOption(index)}>Remove Option</button>
            </div>
          ))}

          <button type="button" onClick={handleAddOption}>Add Option</button>
        </div>
        {error && <p>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Creating Poll...' : 'Create Poll'}
        </button>
      </form>
    </div>
  );
}

export default Poll;

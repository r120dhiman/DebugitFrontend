import React, { useState } from 'react';

const Poll = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([{ optionText: '', votes: 0 }]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeInput, setActiveInput] = useState(null);

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
      const response = await fetch('http://localhost:3001/poll/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question,
          options,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create poll');
      }
      
      const data = await response.json();
      console.log('Poll created successfully:', data);
      setLoading(false);
    } catch (error) {
      setError('There was an error creating the poll.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-3xl mx-auto bg-blue-50/80 backdrop-blur-sm rounded-2xl shadow-xl">
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="relative group">
              <input
                type="text"
                value={question}
                onChange={handleQuestionChange}
                onFocus={() => setActiveInput('question')}
                onBlur={() => setActiveInput(null)}
                required
                placeholder="What would you like to ask?"
                className={`w-full px-6 py-4 bg-transparent border-2 rounded-xl outline-none transition-all duration-300
                  ${activeInput === 'question' 
                    ? 'border-blue-500 shadow-lg shadow-blue-100' 
                    : 'border-gray-200 hover:border-gray-300'}`}
              />
              <div className="absolute -top-3 left-4 px-2 bg-blue-50/80 text-sm font-medium text-gray-500">
                Question
              </div>
            </div>

            <div className="space-y-4">
              {options.map((option, index) => (
                <div 
                  key={index}
                  className={`relative group transition-all duration-300 transform
                    ${activeInput === `option-${index}` ? 'scale-102' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1 relative">
                      <div className="absolute -top-3 left-4 px-2 bg-blue-50/80 text-sm font-medium text-gray-500">
                        Option {index + 1}
                      </div>
                      <input
                        type="text"
                        value={option.optionText}
                        onChange={(e) => handleOptionChange(index, e.target.value)}
                        onFocus={() => setActiveInput(`option-${index}`)}
                        onBlur={() => setActiveInput(null)}
                        required
                        placeholder="Add an option"
                        className={`w-full px-6 py-4 bg-transparent border-2 rounded-xl outline-none transition-all duration-300
                          ${activeInput === `option-${index}` 
                            ? 'border-blue-500 shadow-lg shadow-blue-100' 
                            : 'border-gray-200 hover:border-gray-300'}`}
                      />
                    </div>
                    {options.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveOption(index)}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors duration-300"
                      >
                        <span className="text-xl">×</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={handleAddOption}
                className="w-full py-4 border-2 border-dashed border-blue-200 rounded-xl text-blue-500 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <span className="text-xl">+</span>
                <span>Add Another Option</span>
              </button>
            </div>

            {error && (
              <div className="p-4 mb-4 text-red-500 bg-red-50 rounded-xl border border-red-200">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-xl text-white font-medium transition-all duration-300
                ${loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:shadow-lg hover:shadow-blue-100 transform hover:-translate-y-0.5'}`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="animate-pulse">Creating Poll</span>
                  <span className="animate-bounce">...</span>
                </span>
              ) : (
                'Create Poll'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Poll;
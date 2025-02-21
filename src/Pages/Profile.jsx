import React, { useState, useEffect } from "react";
import { useUser } from "../Api/Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const [UserPolls, setUserPolls] = useState([]);
  const [UserReports, setUserReports] = useState([]);
  const navigate = useNavigate();
  const { loginData, isAuthenticated } = useUser();
  
  useEffect(() => {
    if (!loginData) {
      navigate("/login");
      return;
    }
    
    const userid = loginData.id;
    axios
      .get("https://debugitbackend.onrender.com/reports/userreports", { 
        params: { userid } 
      })
      .then((response) => {
        setUserReports(response.data);
      })
      .catch((error) => console.error("Error fetching reports:", error));
    
    axios
      .get("https://debugitbackend.onrender.com/poll/userpolls", { 
        params: { userid }  
      })
      .then((response) => {
        setUserPolls(response.data);
      })
      .catch((error) => console.error("Error fetching polls:", error));
  }, [loginData, navigate]);  
  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Welcome to Your Profile</h1>
      <div className="my-4 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-semibold">Name</h2>
        <p className="text-lg">{loginData?.first_name} {loginData?.last_name}</p>
        <h3 className="text-xl font-semibold mt-2">Email</h3>
        <p className="text-lg">{loginData?.email}</p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Your Polls</h2>
        {UserPolls.length > 0 ? (
          <ul className="list-disc ml-6">
            {UserPolls.map((poll) => (
              <li key={poll._id} className="mt-2 bg-blue-100 p-2 rounded">
                <p className="font-bold">{poll.question}</p>
                <ul className="ml-4 list-disc">
                  {poll.options.map((option) => (
                    <li key={option._id}>
                      {option.optionText} - Votes: {option.votes}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        ) : (
          <p>No polls created yet.</p>
        )}
      </div>
      <div className="mt-6">
        <h2 className="text-xl font-semibold">Your Reports</h2>
        {UserReports.length > 0 ? (
          <ul className="list-disc ml-6">
            {UserReports.map((report) => (
              <li key={report._id} className="mt-2 bg-red-100 p-2 rounded">
                <p className="font-bold">{report.title}</p>
                <p>{report.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No reports submitted yet.</p>
        )}
      </div>
    </div>
  );
}

export default Profile;
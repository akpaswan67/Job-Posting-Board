import React, { useState } from "react";
import { FaSignOutAlt } from "react-icons/fa"; // Import the logout icon from React Icons
import axios from "axios"; // Import axios for making API requests
import "./styles.css"; // Import the CSS file

function JobPostForm() {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    experienceLevel: "",
    endDate: "",
  });

  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidates, setCandidates] = useState([]);

  const handleInputChange = (e) => {
    setCandidateEmail(e.target.value);
  };

  const handleAddCandidate = () => {
    if (
      candidateEmail.trim() &&
      !candidates.includes(candidateEmail.trim()) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(candidateEmail.trim())
    ) {
      setCandidates((prev) => [...prev, candidateEmail.trim()]);
      setCandidateEmail("");
    } else {
      alert("Please enter a valid and unique email address!");
    }
  };

  const handleRemoveCandidate = (index) => {
    setCandidates((prev) => prev.filter((_, i) => i !== index));
    alert("Job posted successfully!");
  };

  const handleChange = (e) => {
    setJobDetails({ ...jobDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // console.log(jobDetails);
      const response = await axios.post(
        "http://localhost:5000/api/jobs", // Replace with your backend endpoint
        {
          ...jobDetails,
          candidates,
        },
        {
          withCredentials: true,
        }
      );
      alert("Job posted successfully!");
    } catch (error) {
      console.error(error);
      alert("Error posting job.");
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
      alert("You have logged out successfully.");
      window.location.href = "/login"; 
    } catch (error) {
      console.error("Logout error:", error);
      alert("Error logging out.");
    }
  };

  return (
    <div className="job-post-form-container">
      {/* Logout Button */}
      <button
        type="button"
        onClick={handleLogout}
        className="logout-button"
      >
        <FaSignOutAlt size={24} />
        Logout
      </button>

      <form onSubmit={handleSubmit}>
        <h1>Post a Job</h1>

        <input
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Job Description"
          onChange={handleChange}
        />
        <select
          name="experienceLevel"
          onChange={handleChange}
        >
          <option value="">Select Experience Level</option>
          <option value="BEGINNER">BEGINNER</option>
          <option value="INTERMEDIATE">INTERMEDIATE</option>
          <option value="EXPERT">EXPERT</option>
        </select>

        <h2>Add Candidates</h2>
        <div>
          <input
            type="email"
            value={candidateEmail}
            onChange={handleInputChange}
            placeholder="Enter candidate email"
          />
          <button type="button" onClick={handleAddCandidate}>
            Add
          </button>
        </div>

        <div>
          <h3>Candidates List:</h3>
          <ul className="candidates-list">
            {candidates.map((email, index) => (
              <li key={index}>
                <span>{email}</span>
                <button onClick={() => handleRemoveCandidate(index)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>

        <input
          name="endDate"
          type="date"
          onChange={handleChange}
        />
        <button type="submit">Post Job</button>
      </form>
    </div>
  );
}

export default JobPostForm;

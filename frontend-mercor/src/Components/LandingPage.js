import React from 'react';
const LandingPage = ({ startExam }) => {
  return (
    <div className="landing-page">
      <h1>Oral Exam</h1>
      <p>Click the below button to Start the Exam</p>
      <button onClick={startExam}>Start Exam</button>
    </div>
  );
};
export default LandingPage;

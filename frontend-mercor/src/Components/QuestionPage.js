import React from 'react';
import { useParams } from 'react-router-dom';

function QuestionPage({ questions }) {
  const { index } = useParams();

  return (
    <div>
      <h2>Question {parseInt(index) + 1}</h2>
      <p>{questions[index]}</p>
      { }
    </div>
  );
}

export default QuestionPage;

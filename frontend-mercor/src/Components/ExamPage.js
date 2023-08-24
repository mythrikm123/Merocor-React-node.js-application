import React, { useState, useEffect } from 'react';
import './ExamPage.css';

function ExamPage({ questions, currentQuestionIndex, onSubmit, onNext, isRecording, transcript }) {
  const [examStarted, setExamStarted] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [isQuestionPlaying, setIsQuestionPlaying] = useState(false);
  const [isRecordingInProgress, setIsRecordingInProgress] = useState(false);
  const [examCompleted, setExamCompleted] = useState(false);

  const startExam = () => {
    setExamStarted(true);
    setIsQuestionPlaying(true);  
  };

  const currentQuestion = questions[currentQuestionIndex];

  const recordAudioResponse = () => {
    if (!isRecordingInProgress) {
      onSubmit();  
      setIsRecordingInProgress(true);  
    }
    setShowTranscript(false);  
  };

  const readQuestion = (text) => {
    const speechSynthesis = window.speechSynthesis;
    const speechText = new SpeechSynthesisUtterance(text);
    speechText.onstart = () => {
      setIsQuestionPlaying(true);  
      setIsRecordingInProgress(true);  
      setShowTranscript(false);  
    };

    speechText.onend = () => {
      setIsQuestionPlaying(false);  
      setIsRecordingInProgress(false);  
      recordAudioResponse();  
    };
    speechSynthesis.speak(speechText);
  };

  useEffect(() => {
    if (examStarted && !examCompleted) {
      readQuestion(currentQuestion);  
    }
  }, [examStarted, currentQuestion]);

  const handleStopRecording = () => {
    if (isRecordingInProgress) {
      setIsRecordingInProgress(false);  
    }
    setIsQuestionPlaying(false);  
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      onNext();  
    } else {
      setExamCompleted(true);
    }
  };

  const handleReturnToStart = () => {
    setExamCompleted(false);
    setExamStarted(false);
  };

  return (
    <div className='exam-page'>
      {!examStarted ? (
       <div>
         <h3> Are you Ready for the Exam</h3>
        <button onClick={startExam}>Proceed</button>
       </div>
      ) : (
        <>
          <br />
          {currentQuestionIndex < questions.length && !examCompleted && (
            <button
              onClick={handleStopRecording}
              disabled={!isRecordingInProgress || isQuestionPlaying}
              style={{ display: isRecordingInProgress || isQuestionPlaying ? 'block' : 'none' }}
            >
              {isRecordingInProgress ? 'Stop' : 'Record'}
            </button>
          )}
          {examCompleted && (
            <>
              <button onClick={() => setShowTranscript(!showTranscript)}>
                {showTranscript ? 'Hide Transcript' : 'Show Transcript'}
              </button>
              <button onClick={handleReturnToStart}>Submit</button>
              {showTranscript && (
                <div className="transcript">
                  <h3>Transcript</h3>
                  <ul>
                    {transcript.map((entry, index) => (
                      <li key={index}>
                        <strong>Question:</strong> {entry.question}
                        <br />
                        <strong>Response:</strong> {entry.response}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ExamPage;

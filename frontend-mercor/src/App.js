import React, { useState, useEffect } from 'react';
import './App.css';
import LandingPage from './Components/LandingPage';
import ExamPage from './Components/ExamPage';

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'en-US';

function App() {
  const [examStarted, setExamStarted] = useState(false);
  const [questions, setQuestions] = useState([
    "what is an example of iconography",
    "What is network performance",
   "How many ways you can measure the network",
   "what is Bandwidth",
   "what is frequency",
   "Thank you your responses are recorded"
  ]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [transcript, setTranscript] = useState([]);
  const [audioResponse, setAudioResponse] = useState(null);
  const [isRecording, setIsRecording] = useState(false);  

  const startExam = () => {
    setExamStarted(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setIsRecording(false);  
  };

  const recordAudioResponse = () => {
    if (!isRecording) {
      setIsRecording(true);
      recognition.start();
      recognition.onresult = (event) => {
        setIsRecording(false);
        const userResponse = event.results[0][0].transcript;
        setTranscript([
          ...transcript,
          { question: questions[currentQuestionIndex], response: userResponse },
        ]);
        listenToLLMResponse(userResponse);
      };
      recognition.onerror = (event) => {
        setIsRecording(false);
        console.error('Speech recognition error:', event.error);
      };
    } else {
      recognition.stop();
      setIsRecording(false);
    }
  };

  const listenToLLMResponse = async (userResponse) => {
  };

  useEffect(() => {
    return () => {
      recognition.stop();
    };
  }, []);

  if (!examStarted) {
    return <LandingPage startExam={startExam} />;
  }

  if (currentQuestionIndex < questions.length) {
    return (
      <div className="App">
        <ExamPage
          questions={questions}
          currentQuestionIndex={currentQuestionIndex}
          onSubmit={recordAudioResponse}
          onNext={handleNextQuestion}
          isRecording={isRecording}
          transcript={transcript}
        />
      </div>
    );
  } else {
    return <div>Exam Finished</div>;
  }
}

export default App;

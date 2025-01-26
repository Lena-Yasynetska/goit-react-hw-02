// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// const App = () => {
//   return 
//   <div>Hello</div>;
// };

import React, { useState, useEffect } from "react";

const App = () => {
  const [feedback, setFeedback] = useState(() => {
    const saveFeedback = localStorage.getItem("feedback");
    return saveFeedback ? JSON.parse(saveFeedback) : { good: 0, neutral: 0, bad: 0 };
  });

  useEffect(() => {
    localStorage.setItem("feedback", JSON.stringify(feedback));
  }, [feedback]);

  const updateFeedback = (feedbackType) => {
    setFeedback(() => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };
  
const resetFeedback = () => {
  setFeedback({ good: 0, neutral: 0, bad: 0});
};
const totalFeedback = feedback.goot + feedback.neutral + feedback.bad;
const positiveFeedbackPercentage = totalFeedback ? Math.round((feedback.good / totalFeedback) * 100) : 0;

return (
  <div className="app p-4">
    <h1 className="text-2xl font-bolt mb-4">Sip Happens Cafe</h1>
    <p className="mb-6">Please leave your feedback about our service by selecting one of the options below.</p>
    <Option
      updateFeedback={updateFeedback}
      resetFeedback={resetFeedback}
      totalFeedback={totalFeedback}
    />
    {totalFeedback > 0 ? (
      <Feedback
        feedback={feedback}
        totalFeedback={totalFeedback}
        positiveFeedbackPercentage={positiveFeedbackPercentage}
      />
    ) : (
      <Notification message="No feedback given yet."/>
    )}
  </div>
);
};

const Option = ({ updateFeedback, resetFeedback, totalFeedback }) => {
  return (
    <div className="options mb-6">
      <button
        className="bg-green-500 text-white py-2 px-4 rounded mr-2"
        onClick={() => updateFeedback("good")}>
          Good
      </button>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded mr-2"
        onClick={() => updateFeedback("neutral")}>
          Neutral
      </button>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded mr-2"
        onClick={() => updateFeedback("bad")}>
          Bad
      </button>
      {totalFeedback > 0 && (
      <button
        className="bg-green-500 text-white py-2 px-4 rounded mr-2"
        onClick={resetFeedback}>
          Reset
      </button>
      )}
    </div>
  );
};

const Feedback = ({ feedback, totalFeedback, positiveFeedbackPercentage }) => {
  return (
    <div className="feedback">
      <h2 className="text-xl font-semibold mb-4">Statistics</h2>
      <p>Good: {feedback.good}</p>
      <p>Neutral: {feedback.neutral}</p>
      <p>Bad: {feedback.bad}</p>
      <p>Total feedback: {totalFeedback}</p>
      <p>Positive feedback: {positiveFeedbackPercentage}</p>
    </div>
  );
};

const Notification = ({ message}) => {
  return <p className="notification text-gray-500">{message}</p>
};

export default App;

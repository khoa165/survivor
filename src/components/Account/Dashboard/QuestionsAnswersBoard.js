import React from 'react';

const QuestionsAnswersBoard = ({ questions, answers }) => {
  return (
    questions !== null &&
    questions !== undefined &&
    answers !== null &&
    answers !== undefined &&
    answers.length > 0 && (
      <div id='questionsAnswersBoard'>
        <hr />
        <h1 className='heading-title'>Survivor Q&A</h1>
        {answers.map((answer, index) => (
          <div className='questionAnswerGroup' key={index}>
            <p className='question'>{questions[index].text}</p>
            <p className='answer'>{answer}</p>
          </div>
        ))}
      </div>
    )
  );
};

export default QuestionsAnswersBoard;

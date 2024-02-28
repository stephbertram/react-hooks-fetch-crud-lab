import React from "react";

function QuestionItem({ question, onDeleteClick, onCorrectAnswerClick }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const handleCorrectAnswer = (e) => {
    console.log(e.target.value)
    fetch (`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        correctIndex: Number.parseInt(e.target.value),
      }),
    })
      .then(resp => resp.json())
      .then((updatedAnswer) => onCorrectAnswerClick(updatedAnswer))
  }

  const handleDeleteClick = () => {
    fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE"
    })
    .then (resp => resp.json())
    .then (() => onDeleteClick(question))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleCorrectAnswer}>{options}</select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;

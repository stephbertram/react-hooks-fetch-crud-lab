import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDeleteClick, onCorrectAnswerClick }) {
  
const questionsMapped = questions.map((question) => {
  return <QuestionItem question={question} key={question.id} onDeleteClick={onDeleteClick} onCorrectAnswerClick={onCorrectAnswerClick} />
})

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsMapped}</ul>
    </section>
  );
}

export default QuestionList;

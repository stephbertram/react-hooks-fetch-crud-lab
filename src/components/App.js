import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

  useEffect(() =>{
    fetch ("http://localhost:4000/questions")
    .then(resp => resp.json())
    .then(questions => setQuestions(questions))
  }, [])

  const onFormSubmission = (newQuestion) => {
    setQuestions([...questions, newQuestion])
  }

  const onDeleteClick = (deletedQuestion) => {
    const updatedArray = questions.filter(question => question.id !== deletedQuestion.id)
    setQuestions(updatedArray)
  }
 
  const onCorrectAnswerClick = (updatedAnswer) => {
    setQuestions(currentQuestions => currentQuestions.map(question => {
        return (question.correctIndex === updatedAnswer.correctIndex ? updatedAnswer : question)
    }))
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm onFormSubmission={onFormSubmission} /> : 
      <QuestionList 
        questions={questions} 
        onDeleteClick={onDeleteClick}
        onCorrectAnswerClick={onCorrectAnswerClick}
      />}
    </main>
  );
}

export default App;

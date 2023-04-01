import { useContext, useEffect, useRef, useState } from "react";
import Question from "./Question";
import { QuizContext } from "../contexts/quiz";

const Quiz = () => {
  const [quizState, dispatch] = useContext(QuizContext);
  const[countdown,setCountdown] = useState(10)

  console.log(quizState)
  var timer = useRef() ;
    useEffect(()=> {
      timer.current = setInterval(() => {
        setCountdown(prev => prev - 1)
      }, 1000);
      return()=>clearInterval(timer.current)

    },[])
    if(countdown ===0){
      console.log("TImer 0")
      quizState.showResults = true
      clearInterval(timer.current)
    }


  return (
    <div className="quiz">
      <div>Countdown : {countdown}</div>
      {quizState.showResults && (
        <div className="results">
          <div className="congratulations">Congratulations!</div>
          <div className="results-info">
            <div>You have completed the quiz</div>
            <div>
              You've got {quizState.correctAnswersCount} of {" "}
              {quizState.questions.length} right.
            </div>
          </div>
          <div
            onClick={() => dispatch({ type: "RESTART" })}
            className="next-button"
          >
            Restart
          </div>
        </div>
      )}
      {!quizState.showResults && (
        <div>
          <div className="score">
            Question {quizState.currentQuestionIndex + 1}/
            {quizState.questions.length}
          </div>
          <Question />
          {quizState.currentAnswer && (
            <div
              onClick={() => dispatch({ type: "NEXT_QUESTION" })}
              className="next-button"
            >
              Next question
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;

import React from "react";
import TrueFalseQuestion from "./true-false-question";
import MultipleChoiceQuestion from "./multiple-choice-question";

const Question = ({question, questions, setQuestions, graded}) => {

    return(
        <div>
            {
                question.type === "TRUE_FALSE" &&
                <TrueFalseQuestion
                    question={question}
                    questions={questions}
                    setQuestions={setQuestions}
                    graded={graded}/>
            }
            {
                question.type === "MULTIPLE_CHOICE" &&
                <MultipleChoiceQuestion
                    question={question}
                    questions={questions}
                    setQuestions={setQuestions}
                    graded={graded}/>
            }
        </div>
    )
}

export default Question;
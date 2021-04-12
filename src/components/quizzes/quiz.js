import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'
import Question from "./questions/question";
import questionService from "../../services/question-service";

const Quiz = () => {

    const {courseId, quizId} = useParams();
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        questionService.findQuestionsForQuiz(quizId)
            .then(questions => setQuestions(questions))
    }, [quizId])

    return(
        <div>
            <h2>Quiz {quizId}</h2>
            {/*{JSON.stringify(questions)}*/}
            <ul>
                {
                    questions.map(question =>
                        <li key={question._id}>
                            <Question question={question}/>
                        </li>
                    )
                }
            </ul>
        </div>
    );
}

export default Quiz;
import React, {useState, useEffect} from "react";
import {useParams} from 'react-router-dom'
import Question from "./questions/question";
import questionService from "../../services/quiz-service";

const Quiz = () => {

    const {courseId, quizId} = useParams();
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        // TODO: move this to a service file
        fetch(`http://localhost:3000/api/quizzes/${quizId}/questions`)
            .then(response => response.json())
            .then(questions => setQuestions(questions))
    },[])

    // useEffect(() => {
    //     if(quizId !== "undefined" && typeof quizId !== "undefined") {
    //         questionService.findQuizById(quizId)
    //             .then(questions => setQuestions(questions))
    //     }
    // }, [])

    return(
        <div>
            <h2>Quiz {quizId}</h2>
            {JSON.stringify(questions)}
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
import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom'
import Question from "./question";
import questionService from "../../services/question-service";
import quizService from "../../services/quiz-service";

const Quiz = () => {

    const {courseId, quizId} = useParams();
    const [questions, setQuestions] = useState([]);
    const [graded, setGraded] = useState(false);
    const [quiz, setQuiz] = useState({});
    const [results, setResults] = useState({})

    useEffect(() => {
        questionService.findQuestionsForQuiz(quizId)
            .then(res => setQuestions(res));
        quizService.findQuizById(quizId)
            .then(res => setQuiz(res));
        if (graded) {
            quizService.submitQuiz(quiz._id, questions)
                .then(res => setResults(res));
        }
    }, [quizId, graded])


    return(
        <div>
            <h2>Quiz {quizId}</h2>
            {/*{JSON.stringify(questions)}*/}
            <div className='row'>
                <Link to={`/courses/${courseId}/quizzes`} className='fas fa-arrow-left fa-2x mt-2'/>
                <h1>{quiz.title}</h1>
            </div>
            <ul>
                {
                    questions.map(question =>
                        <li key={question._id}>
                            <Question question={question}
                                      questions={questions}
                                      setQuestions={setQuestions}
                                      graded={graded}/>
                        </li>
                    )
                }
                <div>
                    <button onClick={() => setGraded(true)}
                            className='btn btn-success'
                            disabled={graded}>
                        Grade
                    </button>
                    {
                        graded &&
                        <div>
                            <h4>Your score for this attempt is: {results.score}</h4>
                            <p>
                                submission ID is: {results._id}
                            </p>
                            <Link className='btn btn-secondary'
                                  to={`/courses/${courseId}/quizzes/${quizId}/results`}>See Results</Link>
                        </div>
                    }
                </div>
            </ul>
        </div>
    );
}

export default Quiz;
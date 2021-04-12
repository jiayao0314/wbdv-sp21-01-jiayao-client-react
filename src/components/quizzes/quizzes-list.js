import React, {useState, useEffect} from "react";
import {Link, useParams} from "react-router-dom";
import quizService from '../../services/quiz-service';

const QuizzesList = () => {
    const {courseId} = useParams();
    const [quizzes, setQuizzes] = useState([])

    useEffect(() => {
        quizService.findAllQuizzes()
            .then((quizzes) => {
                setQuizzes(quizzes)
            });
    }, [])

    return(
        <div>
            <h2>Quizzes</h2>
            <div className="list-group">
                {
                    quizzes.map((quiz) => {
                        return(
                            <>
                                <Link key={quiz._id}
                                    to={`/courses/${courseId}/quizzes/${quiz._id}`}
                                    className="list-group-item">
                                    {quiz.title}
                                    <button className="border-primary float-right">start</button>
                                </Link>
                            </>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default QuizzesList;
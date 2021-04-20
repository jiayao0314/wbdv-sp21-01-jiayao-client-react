import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import quizService from '../../services/quiz-service';

const QuizResults = () => {
    const {courseId, quizId} = useParams()
    const [results, setResults] = useState([])

    useEffect(() => {
        quizService.getQuizResults(quizId)
            .then(res => setResults(res));
    }, [quizId])

    return (
        <div className='container-fluid'>
            <div className='row'>
                <Link to={`/courses/${courseId}/quizzes`} className='fas fa-arrow-left fa-2x'/>
                <h1>Quiz Results</h1>
            </div>
            <table className='table'>
                <thead>
                <tr>
                    <th>Number</th>
                    <th>ID</th>
                    <th>Score</th>
                </tr>
                </thead>
                <tbody>
                {
                    results.map((result, num) =>
                        <tr key={result._id}>
                            <td>
                                {num}
                            </td>
                            <td>
                                {result._id}
                            </td>
                            <td>
                                {result.score}
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>
        </div>
    )
}

export default QuizResults
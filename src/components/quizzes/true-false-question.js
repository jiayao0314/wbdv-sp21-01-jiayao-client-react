import React, {useEffect, useState} from "react";

const TrueFalseQuestion = ({question, questions, setQuestions, graded}) => {
    const [yourAnswer, setYourAnswer] = useState(null)
    const choices = ['true', 'false']

    useEffect(() => {
        if (graded) {
            const foundQuestion = questions.find(q => q._id === question._id);
            const restOfQuestions = questions.filter(q => q._id !== question._id);
            foundQuestion.answer = yourAnswer;
            const newQuestions = [...restOfQuestions, foundQuestion];
            setQuestions(newQuestions);
        }
    }, [graded])

    return (
        <div>
            <h4>
                {question.question}
                {
                    graded && yourAnswer === question.correct &&
                    <i className="fas fa-check float-right" style={{color:"green"}}/>
                }
                {
                    graded && yourAnswer !== question.correct &&
                    <i className="fas fa-times float-right" style={{color:"red"}}/>
                }
            </h4>
            The answer is: {question.correct}
            <ul className="list-group">
                {
                    choices.map((choice) => {
                        return (
                            <li className={`list-group-item ${
                                graded ? (choice === question.correct ? 'list-group-item-success' : ((yourAnswer !== question.correct && choice === yourAnswer) ? 'list-group-item-danger':"")) : ""}`}>
                                <input onClick={() => {setYourAnswer(choice)}} type="radio" name={question._id}/>
                                {choice}
                                <i className={`${graded ?
                                    (choice === question.correct ? 'fas fa-check float-right' :
                                        ((yourAnswer !== question.correct && choice === yourAnswer) ? 'fas fa-times float-right':"")) : ""}`}
                                   style={{color: `${graded ?
                                           (choice === question.correct ? 'green' :
                                               ((yourAnswer !== question.correct && choice === yourAnswer) ? 'red':"")) : ""}`}}/>
                            </li>
                        )
                    })
                }
            </ul>
            <p>Your answer: {yourAnswer}</p>
            {/*<button onClick={() => setGraded(true)} className="btn-success">grade</button>*/}
        </div>
    )
}

export default TrueFalseQuestion;

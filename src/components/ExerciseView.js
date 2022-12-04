import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";

const axios = require('axios').default;
const APIURL = "http://localhost:5000";

export default function ExerciseView({user}) {
    let {id} = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showScore, setShowScore] = useState(false);
	const [score, setScore] = useState(0);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
 
    const fetchQuestions = async () => {
        const response = await axios.get(APIURL + '/exercise/' + id)
        const data = response.data;
        console.log(data.questions);
        setQuestions(data.questions);
        setLoading(false);
    }

	const handleAnswerOptionClick = (isCorrect) => {
		if (isCorrect) {
			setScore(score + 1);
		} 

		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
            setShowScore(true);
           
            //save new score in database
            var data;
            if (isCorrect) data = {score: score + 1, maxScore: questions.length};
            else data = {score: score, maxScore: questions.length};
            const link = APIURL + '/trainee/' + user.username + '/' + id + '/save-score';
            axios.post(link,data);
			
		}
	};

    useEffect(() => {
        fetchQuestions(); // eslint-disable-next-line
      },[])

    
    //CHANGE EXERCISE CSS ATTRIBUTES FOR IT TO BE CENTERED
    return (
        <>{loading ? <></> : <div className='exercise mt-5 mx-auto w-25'>
        {showScore ? (
            <div className='score-section'>
                You scored {score} out of {questions.length}
            </div>
        ) : (
            <>
                <div className='question-section'>
                    <div className='question-count'>
                        <span>Question {currentQuestion + 1}</span>/{questions.length}
                    </div>
                    <div className='question-text'>{questions[currentQuestion].questionText}</div>
                </div>
                <div className='answer-section'>
                    {questions[currentQuestion].answerOptions.map((answerOption) => (
                        <button onClick={() => handleAnswerOptionClick(answerOption.isCorrect)}>{answerOption.answerText}</button>
                    ))}
                </div>
            </>
        )}
    </div>}</>
  )
}

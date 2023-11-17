import React, { useState } from 'react'
import styles from './Quiz.module.scss'
import { resultInitialState } from './constants'
import AnswerTimer from './components/AnswerTimer/AnswerTimer'
import Result from './components/result/Result'

export default function Quiz({ questions }) {

    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [answerIdx, setAnswerIdx] = useState(null)
    const [answer, setAnswer] = useState(null)
    const [result, setResult] = useState(resultInitialState)
    const [showResult, setShowResult] = useState(false)
    const [showAnswerTimer, setShowAnswerTimer] = useState(true)

    const { question, choices, correctAnswer } = questions[currentQuestion]

    const onAnswerClick = (answer, index) => {
        setAnswerIdx(index)
        if(answer === correctAnswer){
            setAnswer(true)
        }
        else{
            setAnswer(false)
        }
    }

    const onClickNext = (finalAnswer) => {
        setAnswerIdx(null)
        setShowAnswerTimer(false)
        setResult((prev) => 
        finalAnswer ? {
                ...prev,
                score: prev.score + 5,
                correctAnswer: prev.correctAnswer + 1
            } : {
                ...prev,
                wrongAnswers: prev.wrongAnswers + 1
            }
        )
        if(currentQuestion !== questions.length - 1){
            setCurrentQuestion((prev) => prev + 1)
        }
        else{
            setCurrentQuestion(0)
            setShowResult(true)
        }

        setTimeout(() => {
            setShowAnswerTimer(true)
        })
    }
    const onTryAgain = () => {
        setResult(resultInitialState)
        setShowResult(false)
    }

    const handleTimeUp = () => {
        setAnswer(false)
        onClickNext(false)
    }

  return (
    <div className={styles.wrapper}>
        <div className='container'>
            <div className={styles.content}>
                <div className={styles.quizContainer}>
                    {!showResult ? (
                        <>
                            {showAnswerTimer && <AnswerTimer duration={20} onTimeUp={handleTimeUp}/>}
                            <span className={styles.activeQuestion}>{currentQuestion + 1}</span>
                            <span className={styles.totalQuestion}>/{questions.length}</span>
                            <h2>{question}</h2>
                            <ul>
                                {
                                    choices.map((answer, index) => (
                                        <li key={answer} onClick={() => onAnswerClick(answer, index)} className={`${styles.selectedAnswer} ${answerIdx === index ? styles.active : ''}`}>
                                            {answer}
                                        </li>
                                    ))
                                }
                            </ul>
                            <div className={styles.footer}>
                                <button onClick={() => onClickNext(answer)} disabled={answerIdx === null}>{currentQuestion === question.length - 1 ? 'Завершить' : 'Дальше'}</button>
                            </div>
                        </>
                    ) : (
                        <Result result={result} onTryAgain={onTryAgain} totalQuestions={questions.length}/>
                    )}
                </div>
            </div>
        </div>
    </div>
  )
}

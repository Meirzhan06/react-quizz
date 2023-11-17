import React, { useEffect, useRef, useState } from 'react'
import styles from './AnsweeTimer.module.scss'

export default function AnswerTimer({ duration, onTimeUp }) {

    const [counter, setCounter] = useState(0)
    const [progressLoaded, setProgressLoaded] = useState(0)
    const intervalRef = useRef()

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCounter((cur) => cur + 1)
        }, 1000)

        return () => clearInterval(intervalRef.current)
    }, [])

    useEffect(() => {
        setProgressLoaded(100 * (counter / duration))

        if(counter === duration) {
            clearInterval(intervalRef.current)

            setTimeout(() => {
                onTimeUp()
            }, 1000)
        }
    }, [counter])

  return (
    <div className={styles.answerTimerContainer}>
        <div style={{
            width: `${progressLoaded}%`,
            backgroundColor: `${
                progressLoaded < 40 ? '#5389F1' : progressLoaded < 70 ? 'orange' : 'red'
            }`
        }} className={styles.progress}></div>
    </div>
  )
}

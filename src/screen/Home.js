import React from 'react'
import styles from './Home.module.scss'
import lamp from './../assets/Group 7.svg'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className={styles.wrapper}>
        <div className='container'>
            <div className={styles.content}>
                <div className={styles.quiz}>
                    <img src={lamp} alt="" />
                    <h3>Quizz по <br/>  культурологии</h3>
                    <Link to='/quiz'><button>Начать игру</button></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

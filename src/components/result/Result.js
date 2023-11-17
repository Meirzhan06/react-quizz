import React, { useState, useEffect } from 'react';
import styles from './Result.module.scss';
import { Link } from 'react-router-dom';

export default function Result({ totalQuestions, result, onTryAgain }) {
  const [name, setName] = useState('');
  const [highScores, setHighScores] = useState([]);
  const [showScores, setShowScores] = useState(false);

  useEffect(() => {
    // Получение лучших результатов из localStorage при загрузке компонента
    const storedScores = localStorage.getItem('highScores');
    if (storedScores) {
      setHighScores(JSON.parse(storedScores));
    }
  }, []);

  function handleSave() {
    const score = {
      name,
      score: result.score,
    };

    const newHighScores = [...highScores, score].sort((a, b) => b.score - a.score).slice(0, 10);
    setHighScores(newHighScores);
    setShowScores(true);
    localStorage.setItem('highScores', JSON.stringify(newHighScores));
  }

  return (
    <div className={styles.result}>
      <h3>Результат</h3>
      <p>Всего вопросов: <span>{totalQuestions}</span></p>
      <p>Общий результат: <span>{result.score}</span></p>
      <p>Правильные ответы: <span>{result.correctAnswer}</span></p>
      <p>Неправильные ответы: <span>{result.wrongAnswers}</span></p>
      <button onClick={onTryAgain}>Попробовать снова</button>
      {!showScores ? (
        <>
          <h4>
            Введите ваше имя, чтобы сохранить результат
          </h4>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder='Введите ваше имя...'
          />
          <button onClick={handleSave}>Сохранить</button>
        </>
      ) : (
        <>
          <h4>Лучшие результаты</h4>
          <table>
            <thead>
              <tr>
                <th>Место</th>
                <th>Имя</th>
                <th>Результат</th>
              </tr>
            </thead>
            <tbody>
              {highScores.map((score, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{score.name}</td>
                  <td>{score.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      <Link to='/'>Вернуться на главную страницу</Link>
    </div>
  );
}

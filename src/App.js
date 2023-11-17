
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Quiz from './Quiz';
import { jsQuizz } from './constants'
import Home from './screen/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/quiz'  element={<Quiz questions={jsQuizz.questions}/>}/>
      </Routes>
    </div>
  );
}

export default App;

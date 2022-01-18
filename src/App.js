import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import GameProvider from './providers/GameProvider';
import SelectQuiz from './pages/Select-quiz';
import './App.css';
import Quiz from './pages/Quiz';


function App() {
  return (
    <GameProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route 
            path="/select-quiz" 
            element={ <SelectQuiz /> } 
          />
          <Route 
            path="/quiz"
            element={ <Quiz /> }
          />
        </Routes>
      </BrowserRouter>
    </GameProvider>
  );
}

export default App;

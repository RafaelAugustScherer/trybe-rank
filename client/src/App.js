import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import InfoProvider from './providers/InfoProvider';
import GameProvider from './providers/GameProvider';
import SelectQuiz from './pages/Select-quiz';
import './App.css';
import Quiz from './pages/Quiz';


function App() {
  return (
    <InfoProvider>
      <GameProvider>
        <HashRouter>
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
        </HashRouter>
      </GameProvider>
    </InfoProvider>
  );
}

export default App;

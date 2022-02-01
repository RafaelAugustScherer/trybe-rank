import { HashRouter, Routes, Route } from 'react-router-dom';
import InfoProvider from './providers/InfoProvider';
import GameProvider from './providers/GameProvider';
import SelectQuiz from './pages/Select-quiz';
import Quiz from './pages/Quiz';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Score from './pages/Score';
import './App.css';


function App() {
  return (
    <InfoProvider>
      <GameProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={ <SignIn /> } />
            <Route 
              path="/select-quiz" 
              element={ <SelectQuiz /> } 
            />
            <Route 
              path="/quiz"
              element={ <Quiz /> }
            />
            <Route 
              path="/sign-up"
              element={ <SignUp /> }
            />
            <Route 
              path="/score"
              element={ <Score /> }
            />
          </Routes>
        </HashRouter>
      </GameProvider>
    </InfoProvider>
  );
}

export default App;

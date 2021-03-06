import { BrowserRouter, Routes, Route } from 'react-router-dom';
import InfoProvider from './providers/InfoProvider';
import GameProvider from './providers/GameProvider';
import SelectQuiz from './pages/Select-quiz';
import Quiz from './pages/Quiz';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Score from './pages/Score';
import Home from './pages/Home';
import Leaderboard from './pages/Leaderboard';
import './App.css';
import TypeCardsProvider from './providers/TypeCardsProvider';


function App() {
  return (
    <BrowserRouter>
      <InfoProvider>
        <GameProvider>
          <Routes>
            <Route
              path="/"
              element={<SignIn />}
            />
            <Route
              path="/home"
              element={<Home />}
            />
            
              <Route
                path="/select-quiz"
                element={
                <TypeCardsProvider>
                  <SelectQuiz />
                </TypeCardsProvider>
                }
              />
            <Route
              path="/quiz"
              element={<Quiz />}
            />
            <Route
              path="/sign-up"
              element={<SignUp />}
            />
            <Route
              path="/score"
              element={<Score />}
            />
            <Route
              path="/leaderboard"
              element={<Leaderboard />}
            />
          </Routes>
        </GameProvider>
      </InfoProvider>
    </BrowserRouter>
  );
}

export default App;

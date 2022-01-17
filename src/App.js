import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import GameProvider from './providers/GameProvider';
import SelectQuiz from './pages/Select-quiz';
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Login /> } />
        <Route 
          path="/select-quiz" 
          element={
            <GameProvider>
              <SelectQuiz /> 
            </GameProvider>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

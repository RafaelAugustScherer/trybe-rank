import { HashRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import './App.css';


function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={ <Login /> } />
      </Routes>
    </HashRouter>
  );
}

export default App;

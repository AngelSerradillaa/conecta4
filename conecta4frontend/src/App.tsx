import { Routes, Route } from "react-router-dom";
import { LoginPage } from "./components/pages/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import { GamePage } from "./components/pages/GamePage";
import './App.css'

function App() {
  
  return (
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/game" element={<GamePage/>} />
    </Routes>
  )
}

export default App

import React,{useState,useEffect} from 'react'
import Board from './components/Board'
import LoginPage from './components/LoginPage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";



function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    sessionStorage.getItem("isAuthenticated") === "true"
  );
 useEffect(() => {
    if (isAuthenticated) {
      sessionStorage.setItem("isAuthenticated", "true");
    } else {
      sessionStorage.removeItem("isAuthenticated");
    }
  }, [isAuthenticated]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setIsAuthenticated={setIsAuthenticated}/>} />
        <Route path="/board" element={isAuthenticated? <Board/> :<Navigate to="/" />}/>
      </Routes>
    </Router>
  )
}

export default App
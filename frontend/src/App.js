import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/Homepage';  
import SignupLoginForm from './components/SignupLoginForm';
import Readmore from './components/Readmore';
import LoginForm from './components/LoginForm';
import Meals from './components/Meals';
import Recipes from './components/Recipes';

function App() {

    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('http://localhost:8080/api/Homepage')
            .then(response => response.text())
            .then(data => {
                setMessage(data);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage/>} />
                <Route path="/signup" element={<SignupLoginForm/>} />
                <Route path="/login" element={<LoginForm/>} />
                <Route path="/readmore" element={<Readmore/>} />
                <Route path="/meals" element={<Meals/>} />
                <Route path="/recipes" element={<Recipes/>} />
                <Route path="/message" element={<div>{message}</div>} />
            </Routes>
        </Router>
         
        
    );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Events from './pages/Events';
import MyEvents from './pages/MyEvents';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import CreateEvent from './pages/CreateEvent';

function App() {
    return (
        <Router>
            <Navbar />
            <ToastContainer />
            <Routes>

                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/events" element={<Events />} />
                <Route path="/my-events" element={<MyEvents />} />
                <Route path="/createEvent" element={<CreateEvent />} />

            </Routes>
        </Router>
    );
}

export default App;

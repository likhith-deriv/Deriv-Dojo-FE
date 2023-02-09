import React from 'react';
import './app.css';
import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import FirebaseTest from './components/firebase-test';
import Login from './pages/login';
import Profile from './pages/profile';

function App() {
    return (
        <div>
            <nav>
                <ul style={{ display: 'flex', gap: '20px' }}>
                    <li>
                        <Link to='/'>Dashboard</Link>
                    </li>
                    <li>
                        <Link to='/profile'>Profile</Link>
                    </li>
                    <li>
                        <Link to='/firebase-test'>FirebaseTest</Link>
                    </li>
                    {/* next link should be deleted after implementation the logic*/}
                    <li>
                        <Link to='/login'>Login</Link>
                    </li>
                </ul>
            </nav>
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/profile' element={<Profile />} />
                <Route exact path='/' element={<Dashboard />} />
                <Route path='/firebase-test' element={<FirebaseTest />} />
            </Routes>
        </div>
    );
}

export default App;

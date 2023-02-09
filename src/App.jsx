import React from 'react';
import './app.css';
import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/dashboard';
import FirebaseTest from './components/firebase-test';
import Login from './pages/login';
import UpdateProfile from './pages/update-profile';

function App() {
    return (
        <div>
            <nav>
                <ul style={{ display: 'flex', gap: '20px' }}>
                    <li>
                        <Link to='/'>Dashboard</Link>
                    </li>
                    <li>
                        <Link to='/update-profile'>UpdateProfile</Link>
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
                <Route path='/update-profile' element={<UpdateProfile />} />
                <Route exact path='/' element={<Dashboard />} />
                <Route path='/firebase-test' element={<FirebaseTest />} />
            </Routes>
        </div>
    );
}

export default App;

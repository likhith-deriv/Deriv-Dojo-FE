import React from 'react';
import './app.css';
import { Link, Route, Routes } from 'react-router-dom';
import Dashboard from 'pages/dashboard';
import FirebaseTest from 'components/firebase-test';
import Login from 'pages/login';
import Profile from 'pages/profile';
import CircularLoader from 'components/circular-loader';

function App() {
    const [is_authenticated, setIsAuthenticated] = React.useState(false);
    const [is_loading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const name = localStorage.getItem('name');
        if (name) {
            setIsAuthenticated(true);
        }
        setIsLoading(false);
    }, []);

    if (is_loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularLoader />
            </div>
        );
    }

    return is_authenticated ? (
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
                </ul>
            </nav>
            <Routes>
                <Route exact path='/' element={<Dashboard />} />
                <Route path='/profile' element={<Profile setIsAuthenticated={setIsAuthenticated} />} />
                <Route path='/firebase-test' element={<FirebaseTest />} />
            </Routes>
        </div>
    ) : (
        <Login setIsAuthenticated={setIsAuthenticated} setIsLoading={setIsLoading} />
    );
}

export default App;

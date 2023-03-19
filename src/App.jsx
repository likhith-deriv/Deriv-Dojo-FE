import './app.css';

import { Link, Route, Routes } from 'react-router-dom';
import { StoreProvider, useStores } from 'hooks';

import CircularLoader from 'components/circular-loader';
import Dashboard from 'pages/dashboard';
import FirebaseTest from 'components/firebase-test';
import Login from 'pages/login';
import Profile from 'pages/profile';
import React from 'react';
import { isAuthStateChanged } from './firebase-config';

function App() {
    const [is_authenticated, setIsAuthenticated] = React.useState(false);
    const [is_loading, setIsLoading] = React.useState(true);

    const { common_store } = useStores();

    React.useEffect(() => {
        const getAuthStatus = async () => {
            try {
                const data = await isAuthStateChanged();
                if (data?.accessToken) {
                    common_store.setAuthToken(data.accessToken);
                    setIsAuthenticated(true);
                }
            } catch (err) {
                // eslint-disable-next-line no-console
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        getAuthStatus();
    }, []);

    if (is_loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularLoader />
            </div>
        );
    }

    return is_authenticated ? (
        <StoreProvider>
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
        </StoreProvider>
    ) : (
        <Login setIsAuthenticated={setIsAuthenticated} setIsLoading={setIsLoading} />
    );
}

export default App;

import React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Profile = props => {
    const navigate = useNavigate();
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');
    const profile_img = localStorage.getItem('profile_img');

    const handleLogout = () => {
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        localStorage.removeItem('profile_img');
        // eslint-disable-next-line
        props.setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <div>
            <div>Profile name: {name} </div>
            <div>Profile email: {email} </div>
            <div>
                Profile photo: <img src={profile_img} alt='' />
            </div>
            <Button onClick={handleLogout} variant='contained' sx={{ mt: 3, mb: 2 }} color='error'>
                Log out
            </Button>
        </div>
    );
};

export default Profile;

import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import deriv_background from '../assets/images/deriv-background.png';
import { signInWithProvider } from '../firebase-config';

const Copyright = props => (
    <Typography variant='body2' color='text.secondary' align='center' {...props}>
        {'Copyright © '}
        <Link color='inherit' href='https://deriv.com/'>
            Deriv.com
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
);

const Login = props => {
    const handleSignIn = provider => {
        signInWithProvider(provider, props.setIsLoading);
        props.setIsAuthenticated(true);
    };

    return (
        <Grid container sx={{ height: '100vh' }}>
            <Grid
                item
                xs={2}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${deriv_background})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                }}
            />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
                display='flex'
                justifyContent='center'
                alignItems='center'
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'rgb(211, 47, 47)' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component='h1' variant='h5'>
                        Sign in with
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                        <Button
                            onClick={() => handleSignIn('google.com')}
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                            color='error'
                        >
                            Sign In with Google
                        </Button>
                        <Button
                            onClick={() => handleSignIn('github.com')}
                            fullWidth
                            variant='contained'
                            sx={{ mt: 3, mb: 2 }}
                            color='error'
                        >
                            Sign In with GitHub
                        </Button>
                        <Copyright sx={{ mt: 5 }} />
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Login;

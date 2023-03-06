import React from 'react';
import Button from '@mui/material/Button';

const ButtonWrapper = ({ color, text }) => (
    <Button variant='contained' sx={{ bgcolor: color }}>
        {text}
    </Button>
);

export default ButtonWrapper;

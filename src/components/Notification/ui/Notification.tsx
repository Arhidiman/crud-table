import { Snackbar, Alert } from "@mui/material"
import React from 'react';

interface INotification {
    open: boolean
    handleClose: () => void,
    severity: 'success' | 'error',
    message: string
}

export const Notification: React.FC<INotification> = ({ open, handleClose, severity, message }) => {
    return (
        <Snackbar 
            open={open} 
            autoHideDuration={1000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={severity}
                variant="filled"
                sx={{ width: '100%' }}
            >
                {message}
            </Alert>
        </Snackbar>
    )
}

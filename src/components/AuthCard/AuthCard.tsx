import { Button, Card, CardContent, TextField, Typography } from "@mui/material"
import { useAppDispatch, useAppSelector } from "@/main";
import { SET_USERNAME, SET_PASSWORD } from "./store/actionsTypes";
import type { ChangeEventHandler } from "react";

export const AuthCard: React.FC = () => {

    const dispatch = useAppDispatch()

    const auth = useAppSelector(state => state.auth)

    const setName: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const element = e.target as HTMLInputElement
        const value = element.value
        dispatch({type: SET_USERNAME, payload: value})
    }

    const setPassword: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
        const element = e.target as HTMLInputElement
        const value = element.value
        dispatch({type: SET_PASSWORD, payload: value})
    }


    const submitAuth = () => {
        console.log('Authenticated successfully !!!')
    }

    return (
        <Card sx={{ maxWidth: 400, margin: "auto", mt: 8, p: 2, boxShadow: 3 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                Вход
                </Typography>

                <TextField
                    fullWidth
                    label="Имя пользователя"
                    variant="outlined"
                    margin="normal"
                    value={auth.username}
                    onChange={setName}
                />

                <TextField
                    fullWidth
                    label="Пароль"
                    type="password"
                    variant="outlined"
                    margin="normal"
                    value={auth.password}
                    onChange={setPassword}
                />

                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 2 }}
                    onClick={submitAuth}
                >
                    Войти
                </Button>
            </CardContent>
        </Card>
    )
}

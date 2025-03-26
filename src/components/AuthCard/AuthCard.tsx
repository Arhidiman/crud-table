import { Button, Card, CardContent, TextField, Typography } from "@mui/material"
import { RootState, useAppDispatch, useAppSelector } from "@/main";
import { SET_USERNAME, SET_PASSWORD } from "./store/actionsTypes";
import { authenticate } from "@/ApiClient/ApiClient";
import { useState, type ChangeEventHandler } from "react";
import { useNavigate } from "react-router";
import { routes } from "@/AppRouter/routes";

export const AuthCard: React.FC = () => {

    const navigate = useNavigate()
    const [data, setData] = useState<any>(null)

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


    const username = useAppSelector((state: RootState) => state.auth.username) as string
    const password = useAppSelector((state: RootState) => state.auth.password) as string


    const submitAuth = async () => {
        const token = await authenticate({ username, password})
        localStorage.setItem('token', token)
        token && navigate(routes.table)
    }


    console.log(data, 'TOKEN !!!')

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

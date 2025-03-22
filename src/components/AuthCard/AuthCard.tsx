import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useState } from "react";

export const AuthCard: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Логин:", username);
    console.log("Пароль:", password);
    // Здесь можно добавить логику авторизации
  };

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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <TextField
          fullWidth
          label="Пароль"
          type="password"
          variant="outlined"
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2 }}
          onClick={handleLogin}
        >
          Войти
        </Button>
      </CardContent>
    </Card>
  );
}

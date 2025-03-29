import { AppBar, Toolbar, Button, Box } from "@mui/material";
import { NavLink } from "react-router-dom";

export const AppHeader: React.FC = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: "#6b01ff" }}>
            <Toolbar>
                <Box sx={{ flexGrow: 1, display: "flex", gap: 2 }}>
                    <Button
                        component={NavLink}
                        to="/table"
                        sx={{ color: "white", "&.active": { backgroundColor: "white", color: "blue" } }}
                    >
                        Таблица
                    </Button>
                    <Button
                        component={NavLink}
                        to="/"
                        sx={{ color: "white", "&.active": { backgroundColor: "white", color: "blue" } }}
                    >
                        Авторизация
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}

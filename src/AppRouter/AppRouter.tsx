import {Route, Routes} from "react-router-dom"
import {BrowserRouter as Router} from "react-router-dom"
import { TablePage } from "../pages"
import { AuthPage } from "../pages"
import { routes } from "./routes"

export const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path={routes.auth} element={<AuthPage/>}/>
                <Route path={routes.table} element={<TablePage/>}/>
            </Routes>
        </Router>
    )
}
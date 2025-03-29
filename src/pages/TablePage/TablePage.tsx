import { Button } from "@mui/material"
import { Link } from "react-router"
import { DataTable } from "@/modules"
import { TableRecordForm } from '@/modules'
import { routes } from "@/AppRouter/routes"
import type { CSSProperties } from "react"

export const TablePage: React.FC = () => {


    const token = localStorage.getItem('token')
    const containerStyle: CSSProperties = {display: 'flex', flexDirection: 'column', alignItems: 'center'}
    const buttonStyle = {width: '150px', height: '45px'}


    return (
        token 
            ?   
            <>
                <TableRecordForm/>
                <DataTable/>
            </> 
            : 
            <div style={containerStyle}>
                <h1 style={{textAlign: 'center'}}>Вы не авторизованы !</h1>
                <Link to={routes.auth}>
                    <Button variant="contained" color="primary" style={buttonStyle}>
                        Войти
                    </Button>
                </Link>
            </div>
    )
}
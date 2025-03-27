import { DataTable } from "@/modules"
import { TableRecordForm } from '@/modules'

export const TablePage: React.FC = () => {
    return (
        <>
            <TableRecordForm/>
            <DataTable/>
        </>
    )
}
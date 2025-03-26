import { RootState, useAppDispatch, useAppSelector } from "@/main";
import { DataTable } from "@/modules"
import { TableRecordForm } from '@/modules'

export const TablePage: React.FC = () => {

    const record = useAppSelector((state: RootState) => state.tablePage?.recordItem)

    return (

        <>
            <TableRecordForm/>
            <DataTable/>
        </>
        
    )
}
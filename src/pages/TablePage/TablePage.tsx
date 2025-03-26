import { RootState, useAppDispatch, useAppSelector } from "@/main";
import { DataTable } from "@/modules"

export const TablePage: React.FC = () => {

    const record = useAppSelector((state: RootState) => state.tablePage?.recordItem)

    return (
        <DataTable/>
    )
}
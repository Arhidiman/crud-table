import { useState, useEffect } from "react"
import { getTableItems } from "@/ApiClient/ApiClient"
import type { ITableItemDto } from "@/ApiClient/dto"

interface IFetchTableItem {
    items: ITableItemDto[] | [] | undefined,
    loading: boolean,
    error: string | null,
    refetch: () => void
}

export const useFetchTableItems = (): IFetchTableItem => {

    const [items, setItems] = useState<ITableItemDto[] | [] | undefined>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const useFetchItems = async () => {
        try {
            const data = await getTableItems()
            setItems(data)
        } catch(err: any) {
            setError(err?.message || 'Не удалось загрузить данные таблицы') 
        } finally {
            setLoading(false)
        }
    }   

    useEffect(() => {
        useFetchItems()
    }, [JSON.stringify(items)])

    return { items, loading, error, refetch: useFetchItems}

}
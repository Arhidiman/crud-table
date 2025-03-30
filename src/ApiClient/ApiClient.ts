import axios from 'axios';

import type { IAuthDto, IAuthDataDto, ITableItemDto } from './dto';

const API_BASE_URL = 'https://test.v5.pryaniky.com'

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
})

const useXAuthHeader = () => {
    const token = localStorage.getItem('token') || ''
    apiClient.interceptors.request.use((config) => {
        if (token && config.url !== routes.auth) {
            config.headers['x-auth'] = token;
        }
        return config;
    });
}


const routes = {
    auth: '/ru/data/v3/testmethods/docs/login',
    tableData: '/ru/data/v3/testmethods/docs/userdocs/get',
    create: '/ru/data/v3/testmethods/docs/userdocs/create',
    delete: '/ru/data/v3/testmethods/docs/userdocs/delete',
    set: '/ru/data/v3/testmethods/docs/userdocs/set',
}

export const authenticate = async ({ username, password }: IAuthDto) => {
    useXAuthHeader()
    try {
        const { data: responseData } = await apiClient.post(routes.auth, { username, password })
        const { data }: {data: IAuthDataDto}  = responseData || {}
        const { token } = data || {}

        return token
    } catch (error) {
        throw error;
    }
}

export const getTableItems = async () => {
    useXAuthHeader()

    try {
        const { data: responseData }= await apiClient.get(routes.tableData);
        const { data }: {data: ITableItemDto[]}  = responseData || {}

        if (responseData.error_code === 0) {
            return data
        }         
    } catch (error) {
        throw error;
    }
}

export const createTableItem = async (itemData: Omit<ITableItemDto, 'id'>) => {
    useXAuthHeader()
    try {
        const { data: responseData }= await apiClient.post(routes.create, itemData)
        const { data }: { data: ITableItemDto }  = responseData || {}

        if (data) {
            return data
        }
    } catch (error) {
        throw error;
    }
}

export const deleteTableItem = async (id: string) => {
    useXAuthHeader()
    try {
        const { data: responseData } = await apiClient.post(`${routes.delete}/${id}`)
        
        if (responseData.err_code === 0) {
            return id
        }
    } catch (error) {
        throw error;
    }
}

export const updateTableItem = async (id: string, itemData: ITableItemDto) => {
    useXAuthHeader()
    try {
        const { data: responseData }  = await apiClient.post(`${routes.set}/${id}`, itemData)

        const { data }: { data: ITableItemDto }  = responseData || {}
        if (data) {
            return data
        }
    } catch (error) {
        throw error;
    }
}

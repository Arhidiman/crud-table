export interface IAuthDto {
    username: string,
    password: string
}

export interface IAuthDataDto {
    token: string
}

export interface ITableItemDto {
    id: string;
    documentStatus: string;
    employeeNumber: string;
    documentType: string;
    documentName: string;
    companySignatureName: string;
    employeeSignatureName: string;
    employeeSigDate: string;
    companySigDate: string;
}
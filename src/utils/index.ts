export const getDateFromISO = (ISODate: string) => {
    const date = new Date(ISODate);
    const day = String(date.getDate()).padStart(2, "0"); // День месяца
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Месяц (нумерация с 0)
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
};
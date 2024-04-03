import { LoanPage } from "./LoanPage";

export const LOAN_DATA: LoanPage = {
    content: [
        { id: 1, game: { id: 1, title: 'Fortnite', age: 12, category: { id: 1, name: 'Shooter' }, author: { id: 1, name: 'Epic Games', nationality: 'Estados Unidos' } }, client: { id: 1, name: 'Juan Pérez' }, initDate: new Date(2022, 5, 15), endDate: new Date(2022, 6, 15) },
        { id: 2, game: { id: 2, title: 'FIFA 22', age: 3, category: { id: 2, name: 'Deportes' }, author: { id: 2, name: 'EA Sports', nationality: 'Canadá' } }, client: { id: 2, name: 'Pedro Gómez' }, initDate: new Date(2022, 7, 10), endDate: new Date(2022, 8, 10) },
        { id: 3, game: { id: 3, title: 'Assassin\'s Creed Valhalla', age: 18, category: { id: 3, name: 'Aventura' }, author: { id: 3, name: 'Ubisoft', nationality: 'Francia' } }, client: { id: 3, name: 'María López' }, initDate: new Date(2022, 9, 20), endDate: new Date(2022, 10, 20) },
        { id: 4, game: { id: 4, title: 'The Legend of Zelda: Breath of the Wild', age: 10, category: { id: 4, name: 'Aventura' }, author: { id: 4, name: 'Nintendo', nationality: 'Japón' } }, client: { id: 4, name: 'Ana Martínez' }, initDate: new Date(2022, 11, 1), endDate: new Date(2023, 0, 1) },
    ],  
    pageable : {
        pageSize: 5,
        pageNumber: 0,
        sort: [
            {property: "id", direction: "ASC"}
        ]
    },
    totalElements: 4
}

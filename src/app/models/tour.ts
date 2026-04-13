export interface ITour {
    id: string;
    name: string;
    description: string;
    tourOperator: string;
    price: string;
    img: string;
    locationId: string;
    type?: string;
    date?: string;
    code?: string;
    country?: string;
    inBasket?: boolean;
}

export interface IToursData {
    tours: Omit<ITour, 'country' | 'inBasket'>[];
}

export type TourTypes = 'all' | 'single' | 'group';

export interface IFilterTypeLogic {
    key: TourTypes,
    label?: string
}
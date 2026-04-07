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
}

export interface IToursData {
    tours: ITour[];
}

export type TourTypes = 'all' | 'single' | 'group';

export interface IFilterTypeLogic {
    key: TourTypes,
    label?: string
}
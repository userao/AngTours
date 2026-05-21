import { ICountry } from "./country";

export interface ITour {
    id: string;
    name: string;
    description: string;
    tourOperator: string;
    price: string;
    img: Blob;
    locationId?: string;
    type?: string;
    date?: string;
    code?: string;
    country?: ICountry;
    inBasket?: boolean;
}

export interface ITourData extends ITour {
    _id: string;
}

export type ITourUpload = Pick<ITour, 'name' | 'description' | 'tourOperator' | 'price' | 'img'>;

export type TourTypes = "all" | "single" | "group";

export interface IFilterTypeLogic {
    key: TourTypes;
    label?: string;
}

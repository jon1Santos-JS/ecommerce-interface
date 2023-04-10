import { BagModalActionTypes } from '../action-types/bagModal';
import { ProductType } from '../product';

export interface Add_Product {
    type: BagModalActionTypes.ADD_PRODUCT;
    product: ProductType | null;
}

export interface Hydrate_State {
    type: BagModalActionTypes.HYDRATE;
}

export interface Clear_State {
    type: BagModalActionTypes.CLEAR_BAG;
}

export type Action = Add_Product | Hydrate_State | Clear_State;

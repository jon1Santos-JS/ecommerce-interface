import { BagModalActionTypes } from '../action-types/bagModal';
import { ProductType } from '../product';

export interface Action {
    type: BagModalActionTypes;
    product: ProductType | null;
}

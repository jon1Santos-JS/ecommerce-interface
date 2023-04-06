import toTrimString from '@/hook/useTrimString';
import { BagModalActionTypes } from '../action-types/bagModal';
import { Action } from '../action/bagModal';
import { ProductType } from '../product';

export interface BagModalProduct {
    product: ProductType | null;
    amount: number;
}

export function bagModalReducer(state: BagModalProduct[], action: Action) {
    switch (action.type) {
        case BagModalActionTypes.ADD_PRODUCT: {
            if (!action.product) return [...state];

            const wasProductFound = state.find((value) => {
                return value.product?.idMeal === action.product?.idMeal;
            });

            if (wasProductFound) {
                const newState = state.map((value) => {
                    if (
                        value.product?.strMeal ===
                        wasProductFound.product?.strMeal
                    )
                        return {
                            product: value.product,
                            amount: value.amount + 1,
                        };
                    return value;
                });

                return newState;
            }

            return [
                ...state,
                {
                    product: {
                        ...action.product,
                        strMeal: toTrimString(action.product.strMeal, 2),
                    },
                    amount: 1,
                },
            ];
        }
        // case BagModalActionTypes.CLEAR_BAG: {
        //     return [];
        // }
        case BagModalActionTypes.HYDRATE: {
            const stringifiedState = localStorage.getItem('bagmodalState');

            if (!stringifiedState) {
                return [...state];
            }

            const parsedState: BagModalProduct[] = JSON.parse(stringifiedState);

            return parsedState;
        }
        default:
            return [...state];
    }
}

import { BagModalActionTypes } from '../action-types/bagModal';
import { Action } from '../action/bagModal';
import { ProductType } from '../product';

export interface BagModalProduct {
    product: ProductType | null;
    amount: number;
}

export interface BagModalState {
    products: BagModalProduct[];
    total: number;
}

export function bagModalReducer(state: BagModalState, action: Action) {
    switch (action.type) {
        case BagModalActionTypes.ADD_PRODUCT: {
            if (!action.product) return { ...state };

            const foundProduct = state.products.find((value) => {
                return value.product?.idMeal === action.product?.idMeal;
            });

            if (foundProduct && foundProduct.product) {
                const newProducts = state.products.map((value) => {
                    if (value.product?.idMeal === foundProduct.product?.idMeal)
                        return {
                            product: value.product,
                            amount: value.amount + 1,
                        };
                    return value;
                });

                return {
                    products: newProducts,
                    total: state.total + foundProduct.product.price,
                };
            } else {
                state.products.push({ product: action.product, amount: 1 });

                return {
                    ...state,
                    total: state.total + action.product.price,
                };
            }
        }
        case BagModalActionTypes.CLEAR_BAG: {
            return { products: [], total: 0 };
        }
        //HYDRATING CLIENT STATE
        case BagModalActionTypes.HYDRATE: {
            const stringifiedState = localStorage.getItem('bagmodalState');

            if (!stringifiedState) {
                return { ...state };
            }

            const parsedState: BagModalState = JSON.parse(stringifiedState);

            return parsedState;
        }
        default:
            return { ...state };
    }
}

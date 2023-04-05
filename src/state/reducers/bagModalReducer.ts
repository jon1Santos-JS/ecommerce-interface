import toTrimString from '@/hook/useTrimString';
import { Action } from '../action/bagModal';
import { ProductType } from '../product';

export interface BagModalProduct {
    product: ProductType | null;
    amount: number;
}

export function bagModalReducer(
    state: BagModalProduct[],
    { type, product }: Action,
) {
    switch (type) {
        case 'addProduct': {
            if (!product) return [...state];

            const wasProductFound = state.find((value) => {
                return value.product?.idMeal === product?.idMeal;
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
                        ...product,
                        strMeal: toTrimString(product.strMeal, 2),
                    },
                    amount: 1,
                },
            ];
        }
        case 'clearBag': {
            return [];
        }
        default:
            return [...state];
    }
}

import { BagModalActionTypes } from '../action-types/bagModal';
import { Action } from '../action/bagModal';
import { ProductType } from '../product';

export interface BagModalItem {
    product: ProductType | null;
    amount: number;
}

export interface BagModalState {
    items: BagModalItem[];
    totalItems: number;
    total: number;
}

function findProduct(items: BagModalItem[], productToFind: ProductType) {
    return items.find((item) => item.product?.idMeal === productToFind.idMeal);
}

function excludeProduct(items: BagModalItem[], productToExclude: ProductType) {
    return items.filter(
        (item) => item.product?.idMeal !== productToExclude?.idMeal,
    );
}

export function bagModalReducer(state: BagModalState, action: Action) {
    switch (action.type) {
        case BagModalActionTypes.ADD_PRODUCT: {
            if (!action.product) return { ...state };

            const foundItem = findProduct(state.items, action.product);

            if (foundItem && foundItem.product) {
                const newItems = state.items.map((item) => {
                    if (item.product?.idMeal === foundItem.product?.idMeal)
                        return {
                            product: item.product,
                            amount: item.amount + 1,
                        };

                    return item;
                });

                if (foundItem.amount >= 25) return { ...state };

                return {
                    ...state,
                    items: newItems,
                    totalItems: state.totalItems + 1,
                    total: state.total + foundItem.product.price,
                };
            } else {
                const newItems = state.items;

                newItems.push({
                    product: action.product,
                    amount: 1,
                });

                return {
                    ...state,
                    items: newItems,
                    totalItems: state.totalItems + 1,
                    total: state.total + action.product.price,
                };
            }
        }
        case BagModalActionTypes.SUBTRACT_PRODUCT: {
            if (!action.product) return { ...state };

            const foundItem = findProduct(state.items, action.product);

            if (!foundItem || !foundItem.product) return { ...state };

            if (foundItem.amount === 1) {
                const newItems = excludeProduct(state.items, foundItem.product);

                return {
                    ...state,
                    items: newItems,
                    totalItems: state.totalItems - 1,
                    total: state.total - foundItem.product.price,
                };
            }

            const newItems = state.items.map((item) => {
                if (item.product?.idMeal === foundItem.product?.idMeal)
                    return {
                        product: foundItem.product,
                        amount: item.amount - 1,
                    };
                return item;
            });

            return {
                ...state,
                items: newItems,
                totalItems: state.totalItems - 1,
                total: state.total - foundItem.product.price,
            };
        }
        case BagModalActionTypes.CLEAR_BAG: {
            return { ...state, items: [], totalItems: 0, total: 0 };
        }
        //HYDRATING CLIENT STATE
        case BagModalActionTypes.EXCLUDE_PRODUCT: {
            if (!action.product) return { ...state };

            const itemToExclude = findProduct(state.items, action.product);

            if (!itemToExclude || !itemToExclude.product) return { ...state };

            const priceAmountToSubtract =
                itemToExclude.product?.price * itemToExclude.amount;

            const newItems = excludeProduct(state.items, itemToExclude.product);

            return {
                ...state,
                items: newItems,
                totalItems: state.totalItems - itemToExclude.amount,
                total: state.total - priceAmountToSubtract,
            };
        }
        case BagModalActionTypes.HYDRATE: {
            const stringifiedState = localStorage.getItem('bagmodalState');

            if (!stringifiedState) {
                return { ...state };
            }

            const parsedState: BagModalState = JSON.parse(stringifiedState);

            return { ...state, ...parsedState };
        }
        default:
            return { ...state };
    }
}

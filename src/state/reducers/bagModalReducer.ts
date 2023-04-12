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

function findProduct(
    stateProductList: BagModalProduct[],
    productToFind: ProductType,
) {
    return stateProductList.find((product) => {
        return product.product?.idMeal === productToFind.idMeal;
    });
}

function excludeProduct(
    stateProductList: BagModalProduct[],
    productToExclude: ProductType,
) {
    const newList = stateProductList.filter(
        (BGProduct) => BGProduct.product?.idMeal !== productToExclude?.idMeal,
    );
    return newList;
}

export function bagModalReducer(state: BagModalState, action: Action) {
    switch (action.type) {
        case BagModalActionTypes.ADD_PRODUCT: {
            if (!action.product) return { ...state };

            const foundProduct = findProduct(state.products, action.product);

            if (foundProduct && foundProduct.product) {
                const newProducts = state.products.map((value) => {
                    if (value.product?.idMeal === foundProduct.product?.idMeal)
                        return {
                            product: value.product,
                            amount: value.amount + 1,
                        };

                    return value;
                });

                if (foundProduct.amount >= 25) return { ...state };

                return {
                    ...state,
                    products: newProducts,
                    total: state.total + foundProduct.product.price,
                };
            } else {
                const newProducts = state.products ?? [];
                newProducts.push({
                    product: action.product,
                    amount: 1,
                });

                return {
                    ...state,
                    products: newProducts,
                    total: state.total + action.product.price,
                };
            }
        }
        case BagModalActionTypes.SUBTRACT_PRODUCT: {
            if (!action.product) return { ...state };

            const foundProduct = findProduct(state.products, action.product);

            if (!foundProduct || !foundProduct.product) return { ...state };

            if (foundProduct.amount === 1) {
                const newProducts = excludeProduct(
                    state.products,
                    foundProduct.product,
                );

                return {
                    ...state,
                    products: newProducts,
                    total: state.total - foundProduct.product.price,
                };
            }

            const newProducts = state.products.map((BGProduct) => {
                if (BGProduct.product?.idMeal === foundProduct.product?.idMeal)
                    return {
                        product: foundProduct.product,
                        amount: BGProduct.amount - 1,
                    };
                return BGProduct;
            });

            return {
                ...state,
                products: newProducts,
                total: state.total - foundProduct.product.price,
            };
        }
        case BagModalActionTypes.CLEAR_BAG: {
            return { ...state, products: [], total: 0 };
        }
        //HYDRATING CLIENT STATE
        case BagModalActionTypes.EXCLUDE_PRODUCT: {
            if (!action.product) return { ...state };

            const productToExclude = findProduct(
                state.products,
                action.product,
            );

            if (!productToExclude || !productToExclude.product)
                return { ...state };

            const amountToSubtract =
                productToExclude.product?.price * productToExclude.amount;

            const newProducts = excludeProduct(
                state.products,
                productToExclude.product,
            );

            return {
                ...state,
                products: newProducts,
                total: state.total - amountToSubtract,
            };
        }
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

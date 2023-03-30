import { Product } from '@/components/BagModal';
import { Meal } from '@/lib/requestMealList';

interface Action {
    type: 'addProduct';
    meal: Meal;
}

export function bagModalReducer(state: Product[], action: Action) {
    switch (action.type) {
        case 'addProduct': {
            const productFound = state.find((value) => value.meal?.strMeal === action.meal.strMeal);

            if (productFound) {
                const newState = state.map((value) => {
                    if (value.meal?.strMeal === productFound.meal?.strMeal) return { meal: value.meal, amount: value.amount + 1 };
                    return value;
                });

                return newState;
            }

            return [...state, { meal: action.meal, amount: 1 }];
        }
        default:
            return state;
    }
}

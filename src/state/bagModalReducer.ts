import toTrimString from '@/hook/toTrimString';
import { Meal } from '@/lib/requestMealList';

interface Action {
    type: 'addProduct' | 'clearBag';
    meal: Meal | null;
}

export interface Product {
    meal: Meal | null;
    amount: number;
}

export function bagModalReducer(state: Product[], { type, meal }: Action) {
    switch (type) {
        case 'addProduct': {
            if (!meal) return [...state];

            const wasProductFound = state.find((value) => {
                return value.meal?.idMeal === meal?.idMeal;
            });

            if (wasProductFound) {
                const newState = state.map((value) => {
                    if (value.meal?.strMeal === wasProductFound.meal?.strMeal)
                        return {
                            meal: value.meal,
                            amount: value.amount + 1,
                        };
                    return value;
                });

                return newState;
            }

            return [
                ...state,
                {
                    meal: {
                        ...meal,
                        strMeal: toTrimString(meal.strMeal, 2),
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

export interface Meal {
    strMeal: string;
    idMeal: string;
    strMealThumb: string;
}

export interface ProductType extends Meal {
    price: number;
}

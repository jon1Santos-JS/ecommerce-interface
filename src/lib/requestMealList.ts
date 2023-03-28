export type DataType = Meal[] | Error;

export interface Meal {
    strMeal: string;
    idMeal: string;
    strMealThumb: string;
}

export async function requestMealList() {
    let data;
    try {
        const dataResponse = await fetch(
            process.env.PRODUCT_LIST_LINK as string,
        );

        const jsonData = await dataResponse.json();
        data = jsonData.meals;
    } catch {
        data = new Error('Failed to request meal list');
    }

    return data;
}

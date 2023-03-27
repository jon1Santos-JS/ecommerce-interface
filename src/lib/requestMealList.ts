export type DataType = Meal[] | null | string;

export interface Meal {
    strMeal: string;
    idMeal: string;
    strMealThumb: string;
}

export async function requestMealList() {
    let data: DataType = null;
    try {
        const dataResponse = await fetch(
            process.env.PRODUCT_LIST_LINK as string,
        );

        const jsonData = await dataResponse.json();
        data = jsonData.meals;
    } catch {
        data = 'failed to fetch data';
    }

    return data;
}

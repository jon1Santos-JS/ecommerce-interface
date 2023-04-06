export interface ParsedDataType {
    [key: string]: string;
}

export async function requestMealInfo(id: string): Promise<string[]> {
    const data = await fetch((process.env.PRODUCT_INFO_LINK as string) + id);
    const parsedData: ParsedDataType = await data.json();
    const mealIngredients = getMealIngredients(parsedData);

    return mealIngredients;
}

export function getMealIngredients(parsedData: ParsedDataType): string[] {
    const arrayFromObjectData = Array.from(Object.entries(parsedData.meals[0]));
    const ingredientsObject = Object.fromEntries(
        arrayFromObjectData.filter((arr) => {
            if (arr[0].includes('strIngredient') && arr[1]) return arr;
            return '';
        }),
    );
    const ingredientsValues = Object.values(ingredientsObject);

    return ingredientsValues;
}

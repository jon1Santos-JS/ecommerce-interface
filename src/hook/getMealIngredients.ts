import { ParsedDataType } from '@/lib/requestMealInfo';

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

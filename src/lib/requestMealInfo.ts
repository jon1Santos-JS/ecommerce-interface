import { getMealIngredients } from '@/hook/getMealIngredients';

export interface ParsedDataType {
    [key: string]: string;
}

export async function requestMealInfo(id: string): Promise<string[]> {
    const data = await fetch((process.env.PRODUCT_INFO_LINK as string) + id);
    const parsedData: ParsedDataType = await data.json();
    const mealIngredients = getMealIngredients(parsedData);

    return mealIngredients;
}

import { NextApiRequest, NextApiResponse } from 'next';
import currency from '@/lib/currency';
import { randomPrice } from '@/lib/random';
import { DataType, Meal, requestMealList } from '@/lib/requestMealList';

export type ResponseData = { [id: string]: string };

export interface ProductType extends Meal {
    price: string;
}

export async function requestProducts() {
    const data: DataType = await requestMealList();

    if (data instanceof Error) return null;

    const list = data.map((value) => {
        const price = currency(randomPrice(30), 'USD');
        return { ...value, price: price };
    });

    return list;
}

export async function requestAll() {
    const data: DataType = await requestMealList();

    if (data instanceof Error) return null;

    const productList = data.map((value) => {
        const price = currency(randomPrice(30), 'USD');
        return { ...value, price: price };
    });

    return productList;
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProductType[] | null | string>,
) {
    productList = await requestAll();
    if (!productList) return res.status(500).send('internal server error');
    return res.status(200).json(productList);
}

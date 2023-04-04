import { NextApiRequest, NextApiResponse } from 'next';
import { productList, ProductType } from '.';

function findProduct(id: string | string[] | undefined) {
    const product = productList?.find((value) => value.idMeal === id);
    if (!product) return null;

    return product;
}

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ProductType | null | string>,
) {
    console.log(productList);
    const { id } = req.query;
    const product = findProduct(id);
    if (!product) return res.status(500).send('internal server error');

    return res.status(200).json(product);
}

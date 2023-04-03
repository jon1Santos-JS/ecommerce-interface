import useCurrency from '@/hook/useCurrency';
import { randomPrice } from '@/hook/useRandomPrice';
import toTrimString from '@/hook/useTrimString';
import { Meal } from '@/lib/requestMealList';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PreImage from './PreImage';

interface ProductProps {
    meal: Meal | null;
}

export default function Product({ meal }: ProductProps) {
    const [enCurrency] = useCurrency(randomPrice());
    const [price, setPrice] = useState<string>();
    const productImage = meal && (
        <PreImage
            attributes={{
                alt: meal.strMeal,
                src: meal.strMealThumb,
                id: meal.idMeal,
                blurDataUrl: meal.strMealThumb,
            }}
            objectFit="cover"
        />
    );
    const productName = meal && toTrimString(meal.strMeal, 2);

    useEffect(() => {
        if (price) return;
        setPrice(enCurrency);
    }, [enCurrency, price]);

    return (
        <Link
            className="o-product"
            href={{
                pathname: `products/${meal && meal.idMeal}`,
                query: { price: price },
            }}
        >
            <label className="content">
                <div className="image">
                    {productImage ?? 'meal image was not found'}
                </div>
                <h4 className="name">
                    {productName ?? 'meal name was not found'}
                </h4>
                <h4 className="price">{price}</h4>
            </label>
        </Link>
    );
}

import toTrimString from '@/hook/toTrimString';
import { Meal } from '@/lib/requestMealList';
import Link from 'next/link';
import ProductImage from './ProductImage';

interface ProductProps {
    meal: Meal | null;
}

export default function Product({ meal }: ProductProps) {
    const productImage = meal && <ProductImage meal={meal} objectFit="cover" />;
    const productName = meal && toTrimString(meal.strMeal, 2);

    return (
        <Link className="o-product" href={`products/${meal && meal.idMeal}`}>
            <label className="content">
                <div className="image">
                    {productImage ?? 'meal image was not found'}
                </div>
                <h4 className="name">
                    {productName ?? 'meal name was not found'}
                </h4>
            </label>
        </Link>
    );
}

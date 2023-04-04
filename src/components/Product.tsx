import toTrimString from '@/hook/useTrimString';
import { Meal } from '@/lib/requestMealList';
import Link from 'next/link';
import PreImage from './PreImage';

export interface ProductType extends Meal {
    price: string;
}

interface ProductProps {
    product: ProductType;
}

export default function Product({ product }: ProductProps) {
    const productImage = (
        <div className="image">
            <PreImage
                attributes={{
                    alt: product.strMeal,
                    src: product.strMealThumb,
                    id: product.idMeal,
                    blurDataUrl: product.strMealThumb,
                }}
                objectFit="cover"
            />
        </div>
    );
    const productName = (
        <h4 className="name">{toTrimString(product.strMeal, 2)}</h4>
    );
    const price = <h4 className="price">{product.price}</h4>;

    return (
        <Link
            className="o-product"
            href={{
                pathname: `products/${product && product.idMeal}`,
                query: { price: product.price },
            }}
        >
            {renderProduct()}
        </Link>
    );

    function renderProduct() {
        if (!product) return 'product was not found';

        return (
            <label className="content">
                {productImage}
                {productName}
                {price}
            </label>
        );
    }
}

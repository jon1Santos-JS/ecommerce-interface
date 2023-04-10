import toTrimString from '@/hook/useTrimString';
import currency from '@/lib/currency';
import { ProductType } from '@/state/product';
import Link from 'next/link';
import PreImage from './PreImage';

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
    const price = (
        <h4 className="price">
            {product.price && currency(product.price, 'USD')}
        </h4>
    );

    return (
        <Link
            className="o-product"
            href={{
                pathname: `products/${product && product.idMeal}`,
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

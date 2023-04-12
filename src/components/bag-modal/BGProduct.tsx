import { toAddDots, toTrimString } from '@/hook/useTrimString';
import currency from '@/lib/currency';
import { ProductType } from '@/state/product';
import { BagModalProduct } from '@/state/reducers/bagModalReducer';
import { Dispatch, SetStateAction, useEffect } from 'react';
import PreImage from '../PreImage';

interface BGProductProps {
    bagModalProduct: BagModalProduct;
    setProduct: Dispatch<SetStateAction<BagModalProduct | null | undefined>>;
    onOpenProductModal: () => void;
}

export default function BGProduct({
    bagModalProduct: { product, amount },
    setProduct,
    onOpenProductModal,
}: BGProductProps) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => setProduct({ product, amount }), [amount]);

    return <>{toRenderProduct()}</>;

    function toRenderProduct() {
        if (!product) return null;

        const productImage = createImage(product, amount);
        const name = (
            <div className="name">{toShortenName(product.strMeal)}</div>
        );
        const price = (
            <div className="price">
                {product.price && currency(product.price, 'USD')}
            </div>
        );

        return (
            <div
                className="product c-button"
                onClick={() => {
                    setProduct({ product, amount });
                    onOpenProductModal();
                }}
            >
                {productImage ?? 'product image was not found'}
                {name}
                {price}
            </div>
        );
    }

    function createImage(product: ProductType, amount: number) {
        const amountLogic =
            amount === 1 ? null : <div className="amount">{amount}</div>;

        return (
            <div className="image">
                <PreImage
                    attributes={{
                        alt: product.strMeal,
                        src: product.strMealThumb,
                        id: product.idMeal,
                        blurDataUrl: product.strMealThumb,
                    }}
                    objectFit="fill"
                />
                {amountLogic}
            </div>
        );
    }

    function toShortenName(content: string) {
        const splittedContent = content.split(' ');
        if (splittedContent.length <= 4) return content;
        return toAddDots(toTrimString(content, 4));
    }
}

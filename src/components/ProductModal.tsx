import currency from '@/lib/currency';
import { BagModalActionTypes } from '@/state/action-types/bagModal';
import { Action } from '@/state/action/bagModal';
import { ProductType } from '@/state/product';
import { BagModalProduct } from '@/state/reducers/bagModalReducer';
import { Dispatch, useEffect, useState } from 'react';
import PreImage from './PreImage';

interface ProductModalProps {
    isClosed: boolean;
    dispatch: Dispatch<Action>;
    bagModalProduct: BagModalProduct | null | undefined;
}

export default function ProductModal({
    isClosed,
    dispatch,
    bagModalProduct,
}: ProductModalProps) {
    const [isModalClosed, onCloseModal] = useState(isClosed);
    const closeModalLogic = `o-product-modal ${
        isModalClosed ? 'is-closed' : ''
    }`;

    useEffect(() => onCloseModal(isClosed), [isClosed]);

    return <>{renderProduct()}</>;

    function renderProduct() {
        if (!bagModalProduct || !bagModalProduct.product) return null;

        const { product, amount } = bagModalProduct;

        const productImage = createImage(product);
        const name = <div className="name">{product.strMeal}</div>;
        const price = (
            <div className="price">
                {product.price && currency(product.price, 'USD')}
            </div>
        );
        const amountLogic =
            amount === 1 ? null : <div className="amount">{amount}</div>;

        return (
            <div
                className={`o-product-modal ${closeModalLogic}`}
                onClick={(e) => e.stopPropagation()}
            >
                {productImage ?? 'product image was not found'}
                {name}
                {price}
                <div className="add-remove-group">
                    <button className="remove-item c-button">-</button>
                    {amountLogic}
                    <button
                        className="add-item c-button"
                        onClick={() => {
                            dispatch({
                                type: BagModalActionTypes.ADD_PRODUCT,
                                product: product,
                            });
                        }}
                    >
                        +
                    </button>
                </div>
                <button className="exclude-item c-button">exclude</button>
            </div>
        );

        function createImage(product: ProductType) {
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
                </div>
            );
        }
    }
}

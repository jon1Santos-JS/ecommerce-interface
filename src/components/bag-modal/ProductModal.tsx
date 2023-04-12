import currency from '@/lib/currency';
import { BagModalActionTypes } from '@/state/action-types/bagModal';
import { Action } from '@/state/action/bagModal';
import { ProductType } from '@/state/product';
import { BagModalItem } from '@/state/reducers/bagModalReducer';
import { Dispatch } from 'react';
import PreImage from '../PreImage';

interface ProductModalProps {
    dispatch: Dispatch<Action>;
    bagModalItem: BagModalItem | null | undefined;
    onClose: () => void;
    isOpen: boolean;
}

export default function ProductModal({
    dispatch,
    bagModalItem,
    onClose,
    isOpen,
}: ProductModalProps) {
    const closeModalLogic = `${isOpen ? '' : 'is-closed'}`;

    return (
        <>
            <div
                className={`close-modals ${closeModalLogic}`}
                onClick={() => onClose()}
            ></div>
            {renderProduct()}
        </>
    );

    function renderProduct() {
        if (!bagModalItem || !bagModalItem.product) return null;

        const { product, amount } = bagModalItem;

        const productImage = createImage(product);
        const productName = <div className="name">{product.strMeal}</div>;
        const productPrice = (
            <div className="price">
                {product.price && currency(product.price, 'USD')}
            </div>
        );
        const productSubtract = (
            <button
                className="subtract-item c-button"
                onClick={() => {
                    if (amount === 1) onClose();
                    dispatch({
                        type: BagModalActionTypes.SUBTRACT_PRODUCT,
                        product: product,
                    });
                }}
            >
                -
            </button>
        );
        const productAmount = <div className="amount">{amount}</div>;
        const productAdd = (
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
        );
        const productExclude = (
            <button
                className="exclude-item c-button"
                onClick={() => {
                    dispatch({
                        type: BagModalActionTypes.EXCLUDE_PRODUCT,
                        product: product,
                    });
                    onClose();
                }}
            >
                exclude
            </button>
        );

        return (
            <div
                className={`o-product-modal ${closeModalLogic}`}
                onClick={(e) => e.stopPropagation()}
            >
                {productImage ?? 'product image was not found'}
                {productName}
                {productPrice}
                <div className="add-remove-group">
                    {productSubtract}
                    {productAmount}
                    {productAdd}
                </div>
                {productExclude}
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

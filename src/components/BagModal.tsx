import { useEffect, useRef, useState } from 'react';
import PreImage from './PreImage';
import closeIcon from '../../public/images/closeIcon.svg';
import { BagModalProduct } from '@/state/reducers/bagModalReducer';
import { ProductType } from '@/state/product';

interface BagModalProps {
    isClosed: boolean;
    state: BagModalProduct[];
}

export function saveState(state: BagModalProduct[]) {
    const stringifiedState = JSON.stringify(state);
    localStorage.setItem('bagmodalState', stringifiedState);
}

export default function BagModal({ isClosed, state }: BagModalProps) {
    const [isModalClosed, onCloseModal] = useState(isClosed);
    const closeModalLogic = `o-bag-modal ${isModalClosed ? 'is-closed' : ''}`;
    const initialState = useRef(state);

    useEffect(() => {
        if (state !== initialState.current) saveState(state);
    }, [state]);

    useEffect(() => onCloseModal(isClosed), [isClosed]);

    return (
        <div onClick={(e) => e.stopPropagation()} className={closeModalLogic}>
            <div className="content">
                <div
                    className="close-icon c-button"
                    onClick={() => onCloseModal(true)}
                >
                    <PreImage
                        attributes={{
                            alt: 'closeIcon',
                            src: closeIcon,
                        }}
                        objectFit="fill"
                    />
                </div>
                <div className="list">
                    <div className="body">{renderBagModalContent()}</div>
                </div>
            </div>
        </div>
    );

    function renderBagModalContent() {
        if (state) {
            return state.map((value) => {
                const { product, amount } = value;
                const productImage = returnImage(product);

                if (product) {
                    return (
                        <div key={product.idMeal} className="product">
                            <div className="name">{product.strMeal}</div>
                            {productImage ?? 'product image was not found'}
                            <div className="amount">{amount}</div>
                        </div>
                    );
                }
                return null;
            });
        }
        return null;
    }

    function returnImage(product: ProductType | null) {
        if (!product) return;

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

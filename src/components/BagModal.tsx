import { useEffect, useState } from 'react';
import PreImage from './PreImage';
import closeIcon from '../../public/images/closeIcon.svg';
import { BagModalProduct } from '@/state/reducers/bagModalReducer';

interface BagModalProps {
    isClosed: boolean;
    productList: BagModalProduct[];
}

export default function BagModal({ isClosed, productList }: BagModalProps) {
    const [modalState, setModalState] = useState(isClosed);
    const closeModalLogic = `o-bag-modal ${modalState ? 'is-closed' : ''}`;

    useEffect(() => setModalState(isClosed), [isClosed]);

    return (
        <div onClick={(e) => e.stopPropagation()} className={closeModalLogic}>
            <div className="content">
                <div
                    className="close-icon c-button"
                    onClick={() => setModalState(true)}
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
        if (productList) {
            return productList.map((value) => {
                const { product, amount } = value;
                const productImage = product && (
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
}

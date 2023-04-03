import { Product } from '@/state/bagModalReducer';
import { useEffect, useState } from 'react';
import PreImage from './PreImage';
import closeIcon from '../../public/images/closeIcon.svg';

interface BagModalProps {
    isClosed: boolean;
    productList: Product[];
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
            return productList.map((product) => {
                const { meal, amount } = product;
                const productImage = meal && (
                    <div className="image">
                        <PreImage
                            attributes={{
                                alt: meal.strMeal,
                                src: meal.strMealThumb,
                                id: meal.idMeal,
                                blurDataUrl: meal.strMealThumb,
                            }}
                            objectFit="fill"
                        />
                    </div>
                );

                if (product.meal && meal) {
                    return (
                        <div key={meal.idMeal} className="product">
                            <div className="name">{meal.strMeal}</div>
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

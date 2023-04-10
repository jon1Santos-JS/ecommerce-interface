import { Dispatch, useEffect, useRef, useState } from 'react';
import PreImage from './PreImage';
import closeIcon from '../../public/images/closeIcon.svg';
import { BagModalState } from '@/state/reducers/bagModalReducer';
import { ProductType } from '@/state/product';
import { Action } from '@/state/action/bagModal';
import { BagModalActionTypes } from '@/state/action-types/bagModal';
import currency from '@/lib/currency';

interface BagModalProps {
    isClosed: boolean;
    state: BagModalState;
    dispatch: Dispatch<Action>;
}

export function saveState(state: BagModalState) {
    const stringifiedState = JSON.stringify(state);
    localStorage.setItem('bagmodalState', stringifiedState);
}

export default function BagModal({ isClosed, state, dispatch }: BagModalProps) {
    const [isModalClosed, onCloseModal] = useState(isClosed);
    const closeModalLogic = `o-bag-modal ${isModalClosed ? 'is-closed' : ''}`;
    const initialState = useRef(state);

    //HYDRATING SERVER STATE
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
                <div className="box">
                    <div className="total">
                        <div className="title">total</div>
                        <div className="value">{state.total}</div>
                    </div>
                    <div className="buttons">
                        <button className="finalizar-compra c-button">
                            finalizar compra
                        </button>
                        <button
                            className="clear-bag c-button"
                            onClick={(e) => {
                                dispatch({
                                    type: BagModalActionTypes.CLEAR_BAG,
                                });
                                e.stopPropagation();
                            }}
                        >
                            clear bag
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    function renderBagModalContent() {
        if (state.products) {
            return state.products.map((value) => {
                const { product, amount } = value;
                const productImage = returnImage(product, amount);

                if (!product) return null;

                return (
                    <div key={product.idMeal} className="product">
                        {productImage ?? 'product image was not found'}
                        <div className="name">{product.strMeal}</div>
                        <div className="price">
                            {product.price && currency(product.price, 'USD')}
                        </div>
                    </div>
                );
            });
        }
        return null;
    }

    function returnImage(product: ProductType | null, amount: number) {
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
                {amount === 1 ? null : <div className="amount">{amount}</div>}
            </div>
        );
    }
}

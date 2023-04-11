import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import PreImage from './PreImage';
import closeIcon from '../../public/images/closeIcon.svg';
import {
    BagModalProduct,
    BagModalState,
} from '@/state/reducers/bagModalReducer';
import { ProductType } from '@/state/product';
import { Action } from '@/state/action/bagModal';
import { BagModalActionTypes } from '@/state/action-types/bagModal';
import currency from '@/lib/currency';
import { toAddDots, toTrimString } from '@/hook/useTrimString';

interface BagModalProps {
    isClosed: boolean;
    state: BagModalState;
    dispatch: Dispatch<Action>;
    setProduct: Dispatch<SetStateAction<BagModalProduct | null | undefined>>;
    onOpenProductModal: () => void;
}

export function saveState(state: BagModalState) {
    const stringifiedState = JSON.stringify(state);
    localStorage.setItem('bagmodalState', stringifiedState);
}

export default function BagModal({
    isClosed,
    state,
    dispatch,
    setProduct,
    onOpenProductModal,
}: BagModalProps) {
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
                <div className="list">{toRenderProductList()}</div>
                <div className="box">{toRenderTotalBox()}</div>
            </div>
        </div>
    );

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

    function toRenderProductList() {
        if (!state.products) return null;

        return (
            <div className="body">
                {state.products.map((value) => {
                    const { product, amount } = value;

                    if (!product) return null;

                    const productImage = createImage(product, amount);
                    const name = (
                        <div className="name">
                            {toShortenName(product.strMeal)}
                        </div>
                    );
                    const price = (
                        <div className="price">
                            {product.price && currency(product.price, 'USD')}
                        </div>
                    );

                    return (
                        <div
                            key={product.idMeal}
                            className="product c-button"
                            onClick={() => {
                                setProduct(value);
                                onOpenProductModal();
                            }}
                        >
                            {productImage ?? 'product image was not found'}
                            {name}
                            {price}
                        </div>
                    );
                })}
            </div>
        );
    }

    function toRenderTotalBox() {
        return (
            <>
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
            </>
        );
    }
}

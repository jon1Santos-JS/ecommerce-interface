import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import PreImage from '../PreImage';
import closeIcon from '../../../public/images/closeIcon.svg';
import {
    BagModalProduct,
    BagModalState,
} from '@/state/reducers/bagModalReducer';
import { Action } from '@/state/action/bagModal';
import { BagModalActionTypes } from '@/state/action-types/bagModal';
import BGProduct from './BGProduct';

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

    function toRenderProductList() {
        if (!state.products) return null;

        return (
            <div className="body">
                {state.products.map((BGProductData) => {
                    if (!BGProductData.product) return;

                    return (
                        <BGProduct
                            key={BGProductData.product.idMeal}
                            bagModalProduct={BGProductData}
                            setProduct={setProduct}
                            onOpenProductModal={onOpenProductModal}
                        />
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

import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import PreImage from '../PreImage';
import closeIcon from '../../../public/images/closeIcon.svg';
import { BagModalItem, BagModalState } from '@/state/reducers/bagModalReducer';
import { Action } from '@/state/action/bagModal';
import { BagModalActionTypes } from '@/state/action-types/bagModal';
import BGItem from './BGItem';
import currency from '@/lib/currency';

interface BagModalProps {
    onClose: () => void;
    isOpen: boolean;
    state: BagModalState;
    dispatch: Dispatch<Action>;
    setItem: Dispatch<SetStateAction<BagModalItem | null | undefined>>;
    onOpenProductModal: () => void;
}

export function saveState(state: BagModalState) {
    const stringifiedState = JSON.stringify(state);
    localStorage.setItem('bagmodalState', stringifiedState);
}

export default function BagModal({
    isOpen,
    onClose,
    state,
    dispatch,
    setItem,
    onOpenProductModal,
}: BagModalProps) {
    const closeModalLogic = `${isOpen ? '' : 'is-closed'}`;
    const initialState = useRef(state);

    //HYDRATING SERVER STATE
    useEffect(() => {
        if (state !== initialState.current) saveState(state);
    }, [state]);

    return (
        <>
            <div
                className={`o-close-bag-modal ${closeModalLogic}`}
                onClick={() => onClose()}
            ></div>
            <div
                onClick={(e) => e.stopPropagation()}
                className={`o-bag-modal s-secondary-style ${closeModalLogic}`}
            >
                <div className="content">
                    <div
                        className="close-icon c-button"
                        onClick={() => onClose()}
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
                    <div className="box s-primary-style">
                        {toRenderTotalBox()}
                    </div>
                </div>
            </div>
        </>
    );

    function toRenderProductList() {
        if (!state.items) return null;

        return (
            <div className="body">
                {state.items.map((item) => {
                    if (!item.product) return;

                    return (
                        <BGItem
                            key={item.product.idMeal}
                            bagModalItem={item}
                            setItem={setItem}
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
                    <div className="title">TOTAL</div>
                    <div className="value">{currency(state.total, 'USD')}</div>
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

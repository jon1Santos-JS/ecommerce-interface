import BagModal from '@/components/BagModal';
import NavigationBar from '@/components/NavigationBar';
import type { AppProps } from 'next/app';
import '../styles/sass/index.scss';
import { useEffect, useReducer, useState } from 'react';
import {
    BagModalProduct,
    bagModalReducer,
} from '@/state/reducers/bagModalReducer';
import { Meal } from '@/state/product';
import { getProductPrice } from '@/hook/useStorage';
import { BagModalActionTypes } from '@/state/action-types/bagModal';
import ProductModal from '@/components/ProductModal';

export default function App({ Component, pageProps }: AppProps) {
    const [isBagModalClosed, setOnCloseBagModal] = useState(true);
    const [isProductModalClosed, setOnCloseProductModal] = useState(true);
    const [bagModalState, dispatch] = useReducer(bagModalReducer, {
        products: [],
        total: 0,
    });
    const [bagModalProduct, getBagModalProductToEdit] =
        useState<BagModalProduct | null>();

    const closeBagModal = isBagModalClosed ? 'is-closed' : '';

    const closeProductModal = isProductModalClosed ? 'is-closed' : '';

    const addProductToBagModal = () => {
        if (!pageProps.meal) return;

        const product = getProduct(pageProps.meal);

        const action = {
            type: BagModalActionTypes.ADD_PRODUCT,
            product: product,
        };
        dispatch(action);
    };

    const isProductPage = pageProps.meal ? (
        <Component addProductToBagModal={addProductToBagModal} {...pageProps} />
    ) : (
        <Component {...pageProps} />
    );

    useEffect(() => {
        dispatch({ type: BagModalActionTypes.HYDRATE });
    }, []);

    if (pageProps.statusCode === 404) return <Component {...pageProps} />;

    const closeModalByClickOut = () => {
        if (isProductModalClosed) {
            !isBagModalClosed && setOnCloseBagModal(true);
        }
        !isProductModalClosed && setOnCloseProductModal(true);
    };

    return (
        <div className="o-app" onClick={closeModalByClickOut}>
            <NavigationBar onOpenModal={onOpenBagModal} />
            <div className={`close-modals ${closeBagModal}`}></div>
            {isProductPage}
            <BagModal
                isClosed={isBagModalClosed}
                state={bagModalState}
                dispatch={dispatch}
                setProduct={getBagModalProductToEdit}
                onOpenProductModal={onOpenProductModal}
            />
            <div className={`close-modals ${closeProductModal}`}></div>
            <ProductModal
                isClosed={isProductModalClosed}
                bagModalProduct={bagModalProduct}
                dispatch={dispatch}
            />
        </div>
    );

    function onOpenBagModal() {
        setOnCloseBagModal(false);
    }

    function onOpenProductModal() {
        setOnCloseProductModal(false);
    }

    function getProduct(meal: Meal) {
        const price = getProductPrice(pageProps.meal);

        if (!price) return null;

        const product = {
            strMeal: meal.strMeal,
            idMeal: meal.idMeal,
            strMealThumb: meal.strMealThumb,
            price: price,
        };

        return product;
    }
}

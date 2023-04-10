import BagModal from '@/components/BagModal';
import NavigationBar from '@/components/NavigationBar';
import type { AppProps } from 'next/app';
import '../styles/sass/index.scss';
import { useEffect, useReducer, useState } from 'react';
import { bagModalReducer } from '@/state/reducers/bagModalReducer';
import { Meal } from '@/state/product';
import { getProductPrice } from '@/hook/useStorage';
import { BagModalActionTypes } from '@/state/action-types/bagModal';

export default function App({ Component, pageProps }: AppProps) {
    const [isBagModalClosed, setOnCloseBagModal] = useState(true);
    const [bagModalState, dispatch] = useReducer(bagModalReducer, {
        products: [],
        total: 0,
    });

    const closeModal = isBagModalClosed ? 'is-closed' : '';

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

    useEffect(() => dispatch({ type: BagModalActionTypes.HYDRATE }), []);

    if (pageProps.statusCode === 404) return <Component {...pageProps} />;

    return (
        <div
            className="o-app"
            onClick={() => !isBagModalClosed && setOnCloseBagModal(true)}
        >
            <NavigationBar onOpenModal={onOpenModal} />
            <div className={`close-modals ${closeModal}`}></div>
            {isProductPage}
            <BagModal
                isClosed={isBagModalClosed}
                state={bagModalState}
                dispatch={dispatch}
            />
        </div>
    );

    function onOpenModal() {
        setOnCloseBagModal(false);
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

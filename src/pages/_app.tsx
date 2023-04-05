import BagModal from '@/components/BagModal';
import NavigationBar from '@/components/NavigationBar';
import type { AppProps } from 'next/app';
import '../styles/sass/index.scss';
import { useReducer, useState } from 'react';
import { bagModalReducer } from '@/state/reducers/bagModalReducer';
import { useStorage } from '@/hook/useStorage';
import { Meal } from '@/state/product';
import { BagModalActionTypes } from '@/state/action-types/bagModal';

export default function App({ Component, pageProps }: AppProps) {
    const [isBagModalClosed, setOnCloseBagModal] = useState(true);
    const [bagModalState, dispatch] = useReducer(bagModalReducer, [
        { product: null, amount: 0 },
    ]);
    const [getProductPrice] = useStorage();

    const addClasseModalLogic = isBagModalClosed ? 'is-closed' : '';

    const addProductToBagModal = () => {
        if (!pageProps.meal) return;

        const meal: Meal = pageProps.meal;

        const price =
            getProductPrice(pageProps.meal) ?? 'product price was not found';

        const product = {
            strMeal: meal.strMeal,
            idMeal: meal.idMeal,
            strMealThumb: meal.strMealThumb,
            price: price,
        };

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

    if (pageProps.statusCode === 404) return <Component {...pageProps} />;

    return (
        <div
            className="o-app"
            onClick={() => !isBagModalClosed && setOnCloseBagModal(true)}
        >
            <NavigationBar onOpenModal={onOpenModal} />
            <div className={`close-modals ${addClasseModalLogic}`}></div>
            {isProductPage}
            <BagModal isClosed={isBagModalClosed} productList={bagModalState} />
        </div>
    );

    function onOpenModal() {
        setOnCloseBagModal(false);
    }
}

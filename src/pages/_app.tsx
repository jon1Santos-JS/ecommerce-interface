import BagModal from '@/components/BagModal';
import NavigationBar from '@/components/NavigationBar';
import type { AppProps } from 'next/app';
import '../styles/sass/index.scss';
import { useEffect, useReducer, useState } from 'react';
import { bagModalReducer } from '@/state/bagModalReducer';

export default function App({ Component, pageProps }: AppProps) {
    const [isBagModalClosed, setOnCloseBagModal] = useState(true);
    const [bagModalState, dispatch] = useReducer(bagModalReducer, [
        { meal: null, amount: 0 },
    ]);

    const addClasseModalLogic = isBagModalClosed ? 'is-closed' : '';
    const closeModalLogic = () => {
        !isBagModalClosed && setOnCloseBagModal(true);
    };
    const addProductToBagModal = () => {
        dispatch({ type: 'addProduct', meal: pageProps.meal });
    };

    const isProductPage = pageProps.meal ? (
        <Component addProductToBagModal={addProductToBagModal} {...pageProps} />
    ) : (
        <Component {...pageProps} />
    );

    //TEST TO HANDLE MODAL
    // useEffect(() => {
    //     dispatch({ type: 'clearBag', meal: null });
    //     if (pageProps.mealList) {
    //         for (const meal of pageProps.mealList) {
    //             dispatch({ type: 'addProduct', meal: meal });
    //         }
    //     }
    // }, [pageProps]);

    if (pageProps.statusCode === 404) return <Component {...pageProps} />;

    return (
        <div className="o-app" onClick={closeModalLogic}>
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

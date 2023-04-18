import BagModal from '@/components/bag-modal/BagModal';
import NavigationBar from '@/components/NavigationBar';
import type { AppProps } from 'next/app';
import '../styles/sass/index.scss';
import { useEffect, useReducer, useState } from 'react';
import {
    BagModalItem,
    bagModalReducer,
} from '@/state/reducers/bagModalReducer';
import { Meal, ProductType } from '@/state/product';
import { getProductPrice } from '@/hook/useStorage';
import { BagModalActionTypes } from '@/state/action-types/bagModal';
import ProductModal from '@/components/bag-modal/ProductModal';
import { useRouter } from 'next/router';
import { Nunito } from '@next/font/google';

const dongle = Nunito({ weight: '400', subsets: ['latin'] });

export default function App({ Component, pageProps }: AppProps) {
    const [displayBagModal, setDisplayBagModal] = useState(false);
    const [displayProductModal, setDisplayProductModal] = useState(false);
    const [bagModalState, dispatch] = useReducer(bagModalReducer, {
        items: [],
        total: 0,
    });
    const [bagModalItem, getBagModalItemToEdit] =
        useState<BagModalItem | null>();
    const router = useRouter();

    const addProductToBagModal = () => {
        if (!pageProps.meal) return;

        const product = getProduct(pageProps.meal);

        const action = {
            type: BagModalActionTypes.ADD_PRODUCT,
            product: product,
        };
        dispatch(action);
    };

    // TO TEST THE APP
    const addProductToTest = () => {
        if (!pageProps.productList) return;
        dispatch({ type: BagModalActionTypes.CLEAR_BAG });

        const list: ProductType[] = pageProps.productList;

        list.map((product) => {
            dispatch({
                type: BagModalActionTypes.ADD_PRODUCT,
                product: product,
            });
        });
    };

    const isProductPage = pageProps.meal ? (
        <Component addProductToBagModal={addProductToBagModal} {...pageProps} />
    ) : (
        <Component {...pageProps} />
    );

    useEffect(() => {
        dispatch({ type: BagModalActionTypes.HYDRATE });
        addProductToTest();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => onCloseModals(), [router]);

    if (pageProps.statusCode === 404) return <Component {...pageProps} />;

    return (
        <main className={dongle.className}>
            <div className="o-app">
                <NavigationBar
                    onOpenBagModal={onOpenBagModal}
                    onCloseBagModal={() => setDisplayBagModal(false)}
                    isBagModalOpen={displayBagModal}
                />
                {isProductPage}
                <BagModal
                    isOpen={displayBagModal}
                    onClose={() => setDisplayBagModal(false)}
                    state={bagModalState}
                    dispatch={dispatch}
                    setItem={getBagModalItemToEdit}
                    onOpenProductModal={onOpenProductModal}
                />
                <ProductModal
                    bagModalItem={bagModalItem}
                    dispatch={dispatch}
                    onClose={() => setDisplayProductModal(false)}
                    isOpen={displayProductModal}
                />
            </div>
        </main>
    );

    function onOpenBagModal() {
        setDisplayBagModal(true);
    }

    function onOpenProductModal() {
        setDisplayProductModal(true);
    }

    function onCloseModals() {
        setDisplayProductModal(false);
        setDisplayBagModal(false);
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

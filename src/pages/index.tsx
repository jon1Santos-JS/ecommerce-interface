import Product from '@/components/Product';
import ProductModal from '@/components/ProductModal';
import ModalContext from '@/contexts/ProductContext';
import { NextPage } from 'next';
import { useState } from 'react';

interface HomeProps {
    data: DataType;
    fetchState: FetchState;
}

interface DataType {
    mealList: Meal[] | null;
    state: FetchState;
}

type FetchState = 'ok' | 'loading' | Error;

export interface Meal {
    strMeal: string;
    idMeal: string;
    strMealThumb: string;
}

export async function getStaticProps() {
    const data: DataType = { mealList: null, state: 'loading' };
    try {
        const dataResponse = await fetch(
            process.env.PRODUCT_LIST_LINK as string,
        );

        const jsonData = await dataResponse.json();
        data.mealList = jsonData.meals;
        data.state = 'ok';
    } catch {
        data.mealList = null;
        data.state = new Error('failed to fetch data');
    }

    return {
        props: { data: data },
    };
}

const Home: NextPage<HomeProps> = ({ data }: HomeProps) => {
    const [mealFromProduct, setMealToModal] = useState<Meal | null>(null);
    const [isProductModalClosed, setOnCloseProductModal] = useState(true);

    return (
        <div
            className="o-home-page"
            onClick={() => {
                !isProductModalClosed && setOnCloseProductModal(true);
            }}
        >
            <main>
                <section className="o-product-list">
                    {renderProductList()}
                </section>
                <ModalContext.Provider value={mealFromProduct}>
                    <ProductModal isClosed={isProductModalClosed} />
                </ModalContext.Provider>
            </main>
            <footer></footer>
        </div>
    );

    function getMeal(meal: Meal) {
        setMealToModal(meal);
    }

    function renderProductList() {
        if (data.state === 'loading') return 'loading...';
        if (data.state instanceof Error)
            return 'There was a problem to render the product list';
        return (data.mealList as Meal[]).map((meal) => (
            <Product
                key={meal.idMeal}
                meal={meal}
                mealToModal={getMeal}
                onOpenModal={setOnCloseProductModal}
            />
        ));
    }
};

export default Home;

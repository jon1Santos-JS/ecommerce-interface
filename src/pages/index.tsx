import BagModal from '@/components/BagModal';
import Product from '@/components/Product';
import { NextPage } from 'next';
import { useState } from 'react';
import { DataType, requestMealList } from '../lib/requestMealList';

interface HomeProps {
    mealList: DataType;
}

export async function getStaticProps() {
    const mealList = await requestMealList();

    return {
        props: { mealList },
    };
}

const Home: NextPage<HomeProps> = ({ mealList }: HomeProps) => {
    const [isProductModalClosed, setOnCloseProductModal] = useState(true);
    const [isBagModalClosed, setOnCloseBagModal] = useState(true);

    return (
        <div
            className="o-home-page"
            onClick={() => {
                !isProductModalClosed && setOnCloseProductModal(true);
                !isBagModalClosed && setOnCloseBagModal(true);
            }}
        >
            <main>
                <section className="o-product-list">
                    {renderProductList()}
                </section>
                <BagModal isClosed={isBagModalClosed} />
            </main>
            <footer></footer>
        </div>
    );

    function renderProductList() {
        if (mealList && typeof mealList !== 'string') {
            return mealList.map((meal) => (
                <Product key={meal.idMeal} meal={meal} />
            ));
        }
        return null;
    }
};

export default Home;

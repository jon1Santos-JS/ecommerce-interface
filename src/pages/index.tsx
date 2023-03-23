import Product from '@/components/Product';
import ProductModal from '@/components/ProductModal';
import ModalContext from '@/contexts/ProductContext';
import { NextPage } from 'next';
import { useState } from 'react';

interface HomeProps {
    productList: DataType;
}

type DataType = Meal[] | null | Error;

export interface Meal {
    strMeal: string;
    idMeal: string;
    strMealThumb: string;
}

export async function getStaticProps() {
    let data: DataType = null;
    try {
        const dataResponse = await fetch(
            process.env.PRODUCT_LIST_LINK as string,
        );

        const jsonData = await dataResponse.json();
        data = jsonData.meals;
    } catch {
        data = new Error('failed to fetch data');
    }

    return {
        props: { productList: data },
    };
}

const Home: NextPage<HomeProps> = ({ productList }: HomeProps) => {
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
        return (productList as Meal[]).map((meal) => (
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

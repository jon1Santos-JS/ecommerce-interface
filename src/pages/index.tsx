import Product from '@/components/product';
import ProductModal from '@/components/productModal';
import ModalContext from '@/contexts/ProductModalContext';
import { NextPage } from 'next';
import { useState } from 'react';

type DataType = Response | string;

export interface Meal {
    strMeal: string;
    idMeal: string;
    strMealThumb: string;
}

interface HomeProps {
    mealList: Meal[];
}

export async function getStaticProps() {
    let data: DataType;
    try {
        const dataResponse = await fetch(
            process.env.PRODUCT_LIST_LINK as string,
        );

        const jsonData = await dataResponse.json();

        data = jsonData.meals;
    } catch {
        data = 'failed to fetch product list';
    }

    return {
        props: { mealList: data },
    };
}

const Home: NextPage<HomeProps> = (props) => {
    const [product, setProduct] = useState<Meal | null>(null);
    const [onCloseProductModal, setOnCloseProductModal] = useState(true);

    return (
        <>
            <main className="o-home-page">
                <section className="o-product-list">
                    {props.mealList.map((meal: Meal) => (
                        <Product
                            key={meal.idMeal}
                            meal={meal}
                            mealToModal={getMeal}
                            onCloseModal={setOnCloseProductModal}
                        />
                    ))}
                </section>
                <ModalContext.Provider
                    value={{
                        meal: product,
                        isClosed: onCloseProductModal,
                        onClose: () => setOnCloseProductModal(true),
                    }}
                >
                    <ProductModal />
                </ModalContext.Provider>
            </main>
            <footer></footer>
        </>
    );

    function getMeal(product: Meal) {
        setProduct(product);
    }
};

export default Home;

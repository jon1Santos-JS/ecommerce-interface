import Product from '@/components/Product';
import { NextPage } from 'next';
import { DataType, Meal, requestMealList } from '../lib/requestMealList';

interface HomeProps {
    mealList: Meal[] | null;
}

export async function getStaticProps() {
    const mealList: DataType = await requestMealList();

    if (mealList instanceof Error) return { props: { mealList: null } };

    return {
        props: { mealList },
    };
}

const Home: NextPage<HomeProps> = ({ mealList }: HomeProps) => {
    return (
        <div className="o-home-page">
            <main>
                <section className="o-product-list">
                    {renderProductList()}
                </section>
            </main>
            <footer></footer>
        </div>
    );

    function renderProductList() {
        if (mealList) {
            return mealList.map((meal) => (
                <Product key={meal.idMeal} meal={meal} />
            ));
        }
        return 'Meal list request error';
    }
};

export default Home;

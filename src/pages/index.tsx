import { NextPage } from 'next';
import currency from '@/lib/currency';
import { randomPrice } from '@/lib/random';
import { DataType, Meal, requestMealList } from '@/lib/requestMealList';
import Product from '@/components/Product';
import { useEffect, useState } from 'react';

interface HomeProps {
    productList: ProductType[] | null;
}

export type ResponseData = { [id: string]: string };

export interface ProductType extends Meal {
    price: string;
}

export async function requestProducts() {
    const data: DataType = await requestMealList();

    if (data instanceof Error) return null;

    const productListWithPrice = data.map((value) => {
        const price = currency(randomPrice(30), 'USD');
        return { ...value, price: price };
    });

    return productListWithPrice;
}

export async function getStaticProps() {
    const productList = await requestProducts();

    if (!productList) return { props: { productList: null } };

    return {
        props: { productList },
    };
}

const Home: NextPage<HomeProps> = ({ productList }: HomeProps) => {
    // const [list, setList] = useState();

    useEffect(() => {
        if (productList)
            localStorage.setItem('productList', JSON.stringify(productList));
    }, []);

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
        if (!productList) return 'Meal list request error';
        return productList.map((product) => {
            return <Product key={product.idMeal} product={product} />;
        });
    }
};

export default Home;

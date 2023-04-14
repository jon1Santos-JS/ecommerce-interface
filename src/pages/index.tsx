import { NextPage } from 'next';
import { randomPrice } from '@/lib/random';
import { DataType, requestMealList } from '@/lib/requestMealList';
import { useEffect, useState } from 'react';
import { ProductType } from '@/state/product';
import Product from '@/components/Product';

interface HomeProps {
    productList: ProductType[] | null;
}

export async function requestProducts() {
    const data: DataType = await requestMealList();

    if (data instanceof Error) return null;

    const productListWithPrice = data.map((value) => {
        const price = randomPrice(30);
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
    const [productListFromStorage, setproductListFromStorage] = useState<
        ProductType[] | null
    >();

    useEffect(() => {
        getDataFromStorage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        if (productListFromStorage)
            return productListFromStorage.map((product) => {
                return <Product key={product.idMeal} product={product} />;
            });

        if (!productList) return 'product list request error';

        return productList.map((product) => {
            return <Product key={product.idMeal} product={product} />;
        });
    }

    function setDataToStorage() {
        const strigifiedList = JSON.stringify(productList);
        localStorage.setItem('productList', strigifiedList);
    }

    function getDataFromStorage() {
        const stringifiedProductList = localStorage.getItem('productList');

        if (stringifiedProductList) {
            setproductListFromStorage(JSON.parse(stringifiedProductList));
            return;
        }

        setDataToStorage();
    }
};

export default Home;

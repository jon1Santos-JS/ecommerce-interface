import PreImage from '@/components/PreImage';
import toTrimString from '@/hook/useTrimString';
import { requestMealInfo } from '@/lib/requestMealInfo';
import { DataType, Meal, requestMealList } from '@/lib/requestMealList';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface ProductPageProps {
    meal: Meal | null;
    mealInfoList: string[] | null;
    addProductToBagModal: () => void;
}

export default function ProductPage({
    meal,
    mealInfoList,
    addProductToBagModal,
}: ProductPageProps) {
    useEffect(() => {
        const productList = localStorage.getItem('productList');
        if (productList) console.log(JSON.parse(productList));
    }, []);

    return <div className="o-product-page">{renderProductPage()}</div>;

    function renderProductPage() {
        if (!meal) return 'product was not found';
        if (!mealInfoList) return 'product info was not found';

        const productImage = (
            <div className="image">
                <PreImage
                    attributes={{
                        alt: meal.strMeal,
                        src: meal.strMealThumb,
                        id: meal.idMeal,
                        blurDataUrl: meal.strMealThumb,
                    }}
                    objectFit="fill"
                />
            </div>
        );
        const productName = (
            <h4 className="name">{toTrimString(meal.strMeal, 3)}</h4>
        );
        const productInfo = (
            <div className="info">{mealInfoList.join(', ')}</div>
        );
        // const productPrice = <h4 className="price">{price}</h4>;

        return (
            <label className="content">
                {productImage}
                {productName}
                {productInfo}
                {/* {productPrice} */}
                <button className="c-button" onClick={addProductToBagModal}>
                    Add
                </button>
            </label>
        );
    }
}

export async function getStaticPaths() {
    const mealList: DataType = await requestMealList();

    if (mealList instanceof Error) return { paths: '', fallback: false };

    const paths = mealList.map((meal) => ({
        params: { id: meal.idMeal },
    }));

    return { paths: paths, fallback: false };
}

export async function getStaticProps({ params }: Params) {
    const mealList: DataType = await requestMealList();

    if (mealList instanceof Error) return { props: { meal: null } };

    const meal = mealList.reduce((meal, array) => {
        if (meal.idMeal === params.id) return meal;
        return array;
    });

    const mealInfoList: string[] = await requestMealInfo(meal.idMeal);

    if (!mealInfoList) return { props: { meal, mealInfoList: null } };

    return { props: { meal, mealInfoList } };
}

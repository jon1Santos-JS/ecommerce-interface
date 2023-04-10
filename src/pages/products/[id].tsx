import PreImage from '@/components/PreImage';
import { getProductPrice } from '@/hook/useStorage';
import toTrimString from '@/hook/useTrimString';
import currency from '@/lib/currency';
import { requestMealInfo } from '@/lib/requestMealInfo';
import { DataType, requestMealList } from '@/lib/requestMealList';
import { Meal } from '@/state/product';
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
    const [price, setPrice] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        getStorageItem();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div className="o-product-page">{renderProductPage()}</div>;

    function renderProductPage() {
        if (!meal) return 'product was not found';

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
        const productInfo = mealInfoList && (
            <div className="info">
                <div className="title">Ingredients</div>
                <div className="ingredients">{mealInfoList.join(', ')}</div>
                <h4 className="price">
                    {currency(price, 'USD') ?? 'product price was not found'}
                </h4>
            </div>
        );

        return (
            <label className="content">
                {productImage}
                {productName}
                {productInfo ?? 'product info was not found'}
                <button className="c-button" onClick={addProductToBagModal}>
                    Add
                </button>
            </label>
        );
    }

    function getStorageItem() {
        const storageData = getProductPrice(meal);
        if (!storageData) {
            router.push('/');
            return;
        }
        setPrice(storageData);
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

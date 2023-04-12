import { getProductPrice } from '@/hook/useStorage';
import currency from '@/lib/currency';
import { Meal } from '@/state/product';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PreImage from './PreImage';

interface ProductPageProps {
    meal: Meal | null;
    mealInfoList: string[] | null;
    addProductToBagModal: () => void;
}

export default function PageProduct({
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
        const productName = <h4 className="name">{meal.strMeal}</h4>;
        const productInfo = mealInfoList && (
            <div className="info">
                <div className="title">Ingredients</div>
                <div className="ingredients">{mealInfoList.join(', ')}</div>
                <h4 className="price">
                    {currency(price, 'USD') ?? 'product price was not found'}
                </h4>
            </div>
        );
        const addButton = (
            <button className="c-button" onClick={addProductToBagModal}>
                Add
            </button>
        );

        return (
            <label className="content">
                {productImage}
                {productName}
                {productInfo ?? 'product info was not found'}
                {addButton}
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

import { getProductPrice } from '@/hook/useStorage';
import currency from '@/lib/currency';
import { Meal } from '@/state/product';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import PreImage from './PreImage';

interface ProductPageProps {
    meal: Meal | null;
    mealIngredientsList: string[] | null;
    addProductToBagModal: () => void;
}

export default function PageProduct({
    meal,
    mealIngredientsList,
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
                    borderRadius="0.4rem"
                />
            </div>
        );
        const productIngredients = mealIngredientsList && (
            <div className="ingredients">
                <div className="title">Ingredients</div>

                <div className="list-box">
                    <div className="list l-thirty-style">
                        {mealIngredientsList.join(', ')}
                    </div>
                </div>
            </div>
        );
        const productInfo = (
            <div className="o-pp-ct-info">
                <h4 className="name">{meal.strMeal}</h4>
                {productIngredients ?? 'product ingredients was not found'}
                <h4 className="price">
                    {currency(price, 'USD') ?? 'product price was not found'}
                </h4>
            </div>
        );

        const addButton = (
            <button
                className="add-button c-button l-secondary-style l-primary-button l-success-button"
                onClick={addProductToBagModal}
            >
                Add
            </button>
        );

        return (
            <div className="o-pp-content">
                {productImage}
                {productInfo}
                {addButton}
            </div>
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

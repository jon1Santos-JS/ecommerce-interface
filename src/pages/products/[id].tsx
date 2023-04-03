import ProductImage from '@/components/ProductImage';
import toTrimString from '@/hook/toTrimString';
import { requestMealInfo } from '@/lib/requestMealInfo';
import { DataType, Meal, requestMealList } from '@/lib/requestMealList';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

interface ProductPageProps {
    meal: Meal | null;
    mealInfoList: string[];
    addProductToBagModal: () => void;
}

export default function ProductPage({
    meal,
    mealInfoList,
    addProductToBagModal,
}: ProductPageProps) {
    const productImage = meal && (
        <div className="image">
            <ProductImage meal={meal} objectFit="fill" />
        </div>
    );
    const productName = meal && (
        <h4 className="name">{toTrimString(meal.strMeal, 3)}</h4>
    );
    const productInfo = mealInfoList && (
        <div className="info">{mealInfoList.join(', ')}</div>
    );

    return (
        <div className="o-product-page">
            <label className="content">
                {productImage ?? 'meal image was not found'}
                {productName ?? 'meal name was not found'}
                {productInfo ?? 'meal info was not found'}
                <button className="c-button" onClick={addProductToBagModal}>
                    Add
                </button>
            </label>
        </div>
    );
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

    return { props: { meal, mealInfoList } };
}

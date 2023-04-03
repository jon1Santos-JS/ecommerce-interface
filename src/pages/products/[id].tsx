import PreImage from '@/components/PreImage';
import toTrimString from '@/hook/useTrimString';
import { requestMealInfo } from '@/lib/requestMealInfo';
import { DataType, Meal, requestMealList } from '@/lib/requestMealList';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import { useRouter } from 'next/router';

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
    const router = useRouter();

    const productImage = meal && (
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
    const productName = meal && (
        <h4 className="name">{toTrimString(meal.strMeal, 3)}</h4>
    );
    const productInfo = mealInfoList && (
        <div className="info">{mealInfoList.join(', ')}</div>
    );
    const price = <h4 className="price">{router.query.price}</h4>;

    return (
        <div className="o-product-page">
            <label className="content">
                {productImage ?? 'meal image was not found'}
                {productName ?? 'meal name was not found'}
                {productInfo ?? 'meal info was not found'}
                {price}
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

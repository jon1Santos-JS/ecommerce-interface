import PageProduct from '@/components/PageProduct';
import { requestMealInfo } from '@/lib/requestMealInfo';
import { DataType, requestMealList } from '@/lib/requestMealList';
import { Meal } from '@/state/product';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';

interface ProductPageProps {
    meal: Meal | null;
    mealIngredientsList: string[] | null;
    addProductToBagModal: () => void;
}

export default function Page(props: ProductPageProps) {
    return <PageProduct {...props} />;
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

    const mealIngredientsList: string[] = await requestMealInfo(meal.idMeal);

    if (!mealIngredientsList)
        return { props: { meal, mealIngredientsList: null } };

    return { props: { meal, mealIngredientsList } };
}

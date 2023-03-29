import toTrimString from '@/hook/toTrimString';
import { DataType, Meal, requestMealList } from '@/lib/requestMealList';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Image, { ImageLoaderProps } from 'next/image';

interface ProductPageProps {
    meal: Meal | null;
    mealInfoList: string[];
}

interface ParsedDataType {
    [key: string]: string;
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

async function requestMealInfo(id: string): Promise<string[]> {
    const data = await fetch((process.env.PRODUCT_INFO_LINK as string) + id);
    const parsedData: ParsedDataType = await data.json();
    const mealIngredients = getMealIngredients(parsedData);

    return mealIngredients;
}

function getMealIngredients(parsedData: ParsedDataType): string[] {
    const arrayFromObjectData = Array.from(Object.entries(parsedData.meals[0]));
    const ingredientsObject = Object.fromEntries(
        arrayFromObjectData.filter((arr) => {
            if (arr[0].includes('strIngredient') && arr[1]) return arr;
            return '';
        }),
    );
    const ingredientsValues = Object.values(ingredientsObject);

    return ingredientsValues;
}

export default function ProductPage({ meal, mealInfoList }: ProductPageProps) {
    const priority = meal && meal.idMeal === '52855' ? true : undefined;
    const productImage = meal && (
        <div className="image">
            <Image
                loader={imageLoader}
                src={meal.strMealThumb}
                placeholder="blur"
                blurDataURL={meal.strMealThumb}
                style={{ objectFit: 'fill' }}
                fill={true}
                alt={meal.strMeal}
                priority={priority}
                sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
            ></Image>
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
            </label>
        </div>
    );

    function imageLoader({ src, width }: ImageLoaderProps) {
        return `${src}?w=${width}`;
    }
}

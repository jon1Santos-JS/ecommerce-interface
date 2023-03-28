import { DataType, Meal, requestMealList } from '@/lib/requestMealList';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Image, { ImageLoaderProps } from 'next/image';

interface ProductPageProps {
    meal: Meal | null;
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

    return { props: { meal } };
}

export default function ProductPage({ meal }: ProductPageProps) {
    const priority = meal && meal.idMeal === '52855' ? true : undefined;
    const productImage = meal && (
        <div>
            <div className="image">
                <Image
                    loader={imageLoader}
                    src={meal.strMealThumb}
                    placeholder="blur"
                    blurDataURL={meal.strMealThumb}
                    width={200}
                    height={200}
                    alt={meal.strMeal}
                    priority={priority}
                    sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
                ></Image>
            </div>
        </div>
    );

    return (
        <div className="o-product-page">
            <div className="content">
                {productImage ? productImage : 'meal was not found'}
            </div>
        </div>
    );

    function imageLoader({ src, width }: ImageLoaderProps) {
        return `${src}?w=${width}`;
    }
}

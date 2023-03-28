import { Meal, requestMealList } from '@/lib/requestMealList';
import { Params } from 'next/dist/shared/lib/router/utils/route-matcher';
import Image, { ImageLoaderProps } from 'next/image';
import { useRouter } from 'next/router';

interface ProductPageProps {
    product: Meal;
}

export async function getStaticPaths() {
    const mealList = await requestMealList();
    let paths;

    if (mealList && typeof mealList !== 'string') {
        paths = mealList.map((meal) => ({
            params: { id: meal.idMeal },
        }));
    }

    return { paths: paths, fallback: false };
}

export async function getStaticProps({ params }: Params) {
    const mealList = await requestMealList();
    let product;

    if (mealList && typeof mealList !== 'string') {
        product = mealList.reduce((product, array) => {
            if (product.idMeal === params.id) return product;
            return array;
        });
    }

    return { props: { product } };
}

export default function ProductPage({ product }: ProductPageProps) {
    const router = useRouter();
    const productImage = product && (
        <div>
            <div className="image">
                <Image
                    loader={imageLoader}
                    src={product.strMealThumb}
                    width={200}
                    height={200}
                    alt={product.strMeal}
                    sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
                ></Image>
            </div>
            <div className="info">{product.idMeal}</div>
        </div>
    );

    if (router.isFallback) {
        return <div>loading...</div>;
    }

    return (
        <div className="o-product-page">
            <div className="content">{productImage}</div>
        </div>
    );

    function imageLoader({ src, width }: ImageLoaderProps) {
        return `${src}?w=${width}`;
    }
}

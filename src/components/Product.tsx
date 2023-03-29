import toTrimString from '@/hook/toTrimString';
import { Meal } from '@/lib/requestMealList';
import Image, { ImageLoaderProps } from 'next/image';
import Link from 'next/link';

interface ProductProps {
    meal: Meal;
}

export default function Product({ meal }: ProductProps) {
    const priority = meal.idMeal === '52855' ? true : undefined;
    const productImage = (
        <Image
            loader={imageLoader}
            src={meal.strMealThumb}
            style={{ objectFit: 'cover' }}
            fill={true}
            alt={meal.strMeal}
            priority={priority}
            placeholder="blur"
            blurDataURL={meal.strMealThumb}
            sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
        ></Image>
    );

    return (
        <Link className="o-product" href={`products/${meal.idMeal}`}>
            <label className="content">
                <div className="image">{productImage}</div>
                <h4 className="name">{toTrimString(meal.strMeal, 2)}</h4>
            </label>
        </Link>
    );

    function imageLoader({ src, width }: ImageLoaderProps) {
        return `${src}?w=${width}`;
    }
}

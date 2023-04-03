import { Meal } from '@/lib/requestMealList';
import Image, { ImageLoaderProps } from 'next/image';

interface ProductImageProps {
    meal: Meal;
    objectFit: 'cover' | 'fill';
}

export default function ProductImage({ meal, objectFit }: ProductImageProps) {
    const priority = meal.idMeal === '52855' ? true : undefined;

    return (
        <Image
            loader={imageLoader}
            src={meal.strMealThumb}
            blurDataURL={meal.strMealThumb}
            style={{ objectFit: objectFit }}
            fill={true}
            alt={meal.strMeal}
            priority={priority}
            placeholder="blur"
            sizes="(max-width: 768px) 100vw,
    (max-width: 1200px) 50vw,
    33vw"
        ></Image>
    );

    function imageLoader({ src, width }: ImageLoaderProps) {
        return `${src}?w=${width}`;
    }
}

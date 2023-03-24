import Image, { ImageLoaderProps } from 'next/image';
import { Meal } from '@/pages';

interface ProductModalProps {
    isClosed: boolean;
    meal: Meal;
}

export default function ProductModal({ isClosed, meal }: ProductModalProps) {
    const productImage = meal && (
        <div>
            <div className="product-image">
                <Image
                    loader={imageLoader}
                    src={meal.strMealThumb}
                    width={200}
                    height={200}
                    alt={meal.strMeal}
                    sizes="(max-width: 768px) 100vw,
            (max-width: 1200px) 50vw,
            33vw"
                ></Image>
            </div>
            <div className="product-info">{meal.idMeal}</div>
        </div>
    );

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={`o-product-modal ${isClosed ? 'is-closed' : ''}`}
        >
            <div onClick={(e) => e.stopPropagation()} className="content">
                {productImage}
            </div>
        </div>
    );

    function imageLoader({ src, width }: ImageLoaderProps) {
        return `${src}?w=${width}`;
    }
}

import ProductContext from '@/contexts/ProductContext';
import { useContext } from 'react';
import Image, { ImageLoaderProps } from 'next/image';

interface ProductModalProps {
    isClosed: boolean;
}

export default function ProductModal({ isClosed }: ProductModalProps) {
    const meal = useContext(ProductContext);

    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={`o-product-modal ${isClosed ? 'is-closed' : ''}`}
        >
            <div onClick={(e) => e.stopPropagation()} className="content">
                {meal && (
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
                )}
            </div>
        </div>
    );

    function imageLoader({ src, width }: ImageLoaderProps) {
        return `${src}?w=${width}`;
    }
}

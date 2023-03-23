import ProductContext from '@/contexts/ProductContext';
import { useContext } from 'react';

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
            <div onClick={(e) => e.stopPropagation()} className="o-content">
                {meal && <div>{meal.idMeal}</div>}
            </div>
        </div>
    );
}

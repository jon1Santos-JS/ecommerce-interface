import ProductModalContext, {
    ProductModalTypes,
} from '@/contexts/ProductModalContext';
import { useContext } from 'react';

export default function ProductModal() {
    const content = useContext<ProductModalTypes>(
        ProductModalContext as ProductModalTypes,
    );

    return (
        <div className="o-product-modal">
            {content.meal && <div>{content.meal.idMeal}</div>}
        </div>
    );
}

import { Product } from '@/state/bagModalReducer';
import ProductImage from './ProductImage';

interface BagModalProps {
    isClosed: boolean;
    productList: Product[];
}

export default function BagModal({ isClosed, productList }: BagModalProps) {
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={`o-bag-modal ${isClosed ? 'is-closed' : ''}`}
        >
            <div className="content">
                <div className="body">{renderBagModalContent()}</div>
            </div>
        </div>
    );

    function renderBagModalContent() {
        if (productList) {
            return productList.map((product) => {
                const { meal, amount } = product;
                const productImage = meal && (
                    <div className="image">
                        <ProductImage meal={meal} objectFit="fill" />
                    </div>
                );

                if (product.meal && meal) {
                    return (
                        <div key={meal.idMeal} className="product">
                            <div className="name">{meal.strMeal}</div>
                            {productImage ?? 'product image was not found'}
                            <div className="amount">{amount}</div>
                        </div>
                    );
                }
                return null;
            });
        }
        return null;
    }
}

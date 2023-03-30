import { Meal } from '@/lib/requestMealList';

interface BagModalProps {
    isClosed: boolean;
    productList: Product[];
}

export interface Product {
    meal: Meal | null;
    amount: number;
}

export default function BagModal({ isClosed, productList }: BagModalProps) {
    return (
        <div
            onClick={(e) => e.stopPropagation()}
            className={`o-bag-modal ${isClosed ? 'is-closed' : ''}`}
        >
            <div className="content">
                <div className="head">
                    <div className="name"></div>
                    <div className="image"></div>
                    <div className="amount"></div>
                </div>
                <div className="body">{renderBagModalContent()}</div>
            </div>
        </div>
    );

    function renderBagModalContent() {
        if (productList) {
            return productList.map((product) => {
                if (product.meal) {
                    return (
                        <div key={product.meal.idMeal}>
                            <div>{product.amount}</div>
                            {product.meal.strMeal}
                        </div>
                    );
                }
                return null;
            });
        }
        return null;
    }
}

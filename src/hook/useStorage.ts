import { Meal, ProductType } from '@/state/product';

export function useStorage() {
    function getProductPrice(meal: Meal | null) {
        const stringifiedList = localStorage.getItem('productList');
        if (!stringifiedList) {
            return;
        }

        const productList: ProductType[] = JSON.parse(stringifiedList);

        if (!meal) return;

        const productPrice = productList.find((product) => {
            return meal.idMeal === product.idMeal;
        })?.price;

        return productPrice;
    }

    return [getProductPrice];
}

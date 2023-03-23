import { Meal } from '@/pages';
import Image, { ImageLoaderProps } from 'next/image';
import { Dispatch, SetStateAction } from 'react';

interface ProductProps {
    meal: Meal;
    mealToModal: (product: Meal) => void;
    onCloseModal: Dispatch<SetStateAction<boolean>>;
}

export default function Product({
    meal,
    mealToModal,
    onCloseModal,
}: ProductProps) {
    return (
        <div
            onClick={() => {
                mealToModal(meal);
                onCloseModal(false);
            }}
        >
            <Image
                loader={imageLoader}
                src={meal.strMealThumb}
                width={200}
                height={200}
                alt={meal.strMeal}
            ></Image>
            <h2>{meal.strMeal}</h2>
        </div>
    );

    function imageLoader({ src, width }: ImageLoaderProps) {
        return `${src}?w=${width}`;
    }
}

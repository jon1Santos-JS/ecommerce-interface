import { NextPage } from 'next';

type DataType = Response | string;

interface Meal {
    idMeal: string;
    strMealThumb: string;
}

interface HomeProps {
    mealList: Meal[];
}

export async function getStaticProps() {
    let data: DataType;
    try {
        const dataResponse = await fetch(
            process.env.PRODUCT_LIST_LINK as string,
        );

        const jsonData = await dataResponse.json();

        data = jsonData.meals;
    } catch {
        data = 'failed to fetch data';
    }

    return {
        props: { mealList: data },
    };
}

const Home: NextPage<HomeProps> = (props) => {
    console.log(props.mealList);
    return (
        <div>
            {props.mealList.map((meal: Meal) => (
                <div key={meal.idMeal}>{meal.strMealThumb}</div>
            ))}
        </div>
    );
};

export default Home;

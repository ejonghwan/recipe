import Head from 'next/head';
import axios from 'axios';
import styles from './style.module.scss';

export default function Recipe({ data, categories }) {

	console.log(data, categories)

	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<div className={styles.box}>
				{categories.meals.map(item => (
					<div key={item.idMeal}>
						{item.strMeal}
					</div>
				))}
			</div>
		</>
	);
}


export async function getStaticProps() {
	const list = [];
	const { data: obj } = await axios.get('/categories.php');

	console.log(obj)

	const items = obj.categories;
	items.forEach((el) => list.push(el.strCategory));
	const newList = list.filter((el) => el !== 'Goat' && el !== 'Vegan' && el !== 'Starter');

	const randomNum = Math.floor(Math.random() * newList.length);
	const { data } = await axios.get(`/filter.php?c=${newList[randomNum]}`);

	return {
		props: { categories: data }
		// props: { ...data, category: newList[randomNum] },
		// revalidate: 60 * 60 * 24,
	};
}


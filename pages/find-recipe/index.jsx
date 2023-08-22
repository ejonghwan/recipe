import Head from 'next/head';
import styles from './style.module.scss';
import axios from 'axios';
import Category from '@/components/molecules/Category/Category';
import { useRecipeByCategory } from '@/hooks/useRecipe';
import { useEffect, useState } from 'react';

export default function Recipe({ categories }) {
	// console.log(categories);

	const [Select, setSelect] = useState('Beef');
	const { data, isSuccess } = useRecipeByCategory(Select)
	
	
	useEffect(() => {
		console.log(Select)
		console.log(data)
	}, [Select, data])
	
	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<section className={styles.recipePage}>
				<Category items={categories} setSelect={setSelect}/>
				{data?.map(item => <div key={item.idMeal}>{item.strMeal}</div>)}
			</section>
		</>
	);
}

export async function getStaticProps() {
	const { data } = await axios.get('/categories.php');

	return {
		props: { categories: data.categories },
	};
}

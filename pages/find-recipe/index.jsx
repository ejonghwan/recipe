import Head from 'next/head';
import styles from './style.module.scss';
import axios from 'axios';
import Category from '@/components/molecules/Category/Category';
import { useRecipeByCategory, useRecipeBySearch } from '@/hooks/useRecipe';
import { useEffect, useState } from 'react';
import { useDebounce } from '@/hooks/useDebounce';
import Card from '@/components/molecules/Card/Card';
import { Title } from '@/components/atoms/text/Title';
import clsx from 'clsx';
import SearchBar from '@/components/molecules/SearchBar/SearchBar';

export default function Recipe({ categories }) {
	const [Selected, setSelected] = useState(categories[0].strCategory);
	const [Search, setSearch] = useState('');

	const DebouncedSelected = useDebounce(Selected);
	const DebouncedSearch = useDebounce(Search);
	const { data: dataByCategory, isSuccess: isCategory } = useRecipeByCategory(DebouncedSelected, DebouncedSearch);
	const { data: dataBySearch, isSuccess: isSearch } = useRecipeBySearch(DebouncedSearch);

	const handleTest = category => {
		console.log(category)
		setSearch('')
		setSelected(category)
	}

	useEffect(() => {
		if(DebouncedSearch) {
			setSelected('');
		} else {
			setSearch('');
			!DebouncedSelected && setSelected(categories[0].strCategory)
		}
	}, [DebouncedSearch, DebouncedSelected])

	return (
		<>
			<Head>
				<title>Recipe Page</title>
			</Head>

			<section className={styles.recipePage}>
				{/* 버튼활성화 순서1- category로 활성화여부를 구분할수 있는 정보값을 active라는 props로 전달 */}
				<Category items={categories} onClick={handleTest} active={DebouncedSelected} />

				

				<Title type={'slogan'} className={clsx(styles.titCategory)}>
					{DebouncedSelected ? DebouncedSelected : DebouncedSearch}
				</Title>


				<SearchBar inputType={'text'} isBtn={false} placeholder={'search'} value={Search} onChange={e => setSearch(e.target.value)}/>


				<div className={clsx(styles.listFrame)}>
					{isSearch && 
						dataBySearch.map((el) => (
							<Card
								key={el.idMeal}
								imgSrc={el.strMealThumb}
								url={`/find-recipe/${el.idMeal}`}
								txt={el.strMeal}
								className={clsx(styles.card)}
							/>
						))}
					{isCategory && 
						dataByCategory.map((el) => (
							<Card
								key={el.idMeal}
								imgSrc={el.strMealThumb}
								url={`/find-recipe/${el.idMeal}`}
								txt={el.strMeal}
								className={clsx(styles.card)}
							/>
						))}
				</div>
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

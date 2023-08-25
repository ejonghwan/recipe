import { useRouter } from 'next/router';
import { useRecipeById } from '@/hooks/useRecipe';
import { Title } from '@/components/atoms/text/Title';
import { Pic } from '@/components/atoms/pic/Pic';
import styles from './detail.module.scss'
import clsx from 'clsx';
import { BounceLoader } from 'react-spinners';
import { useState, useEffect } from 'react';
import { Table } from '@/components/atoms/Table/Table';

function Detail() {
	const router = useRouter();
	const { id, name, url } = router.query;

	const { data, isSuccess, isLoading } = useRecipeById(id);
	const [TableData, setTableData] = useState([]);

	useEffect(() => {
		if(data) {
			const keys = Object.keys(data);
			const filterKeys1 = keys.filter(key => key.startsWith('strIngredient')); //원하는 키만 
			const filterKeys2 = filterKeys1.filter(key => data[key] !== '' && data[key] !== null); //빈값이나 널은 빼고
	
			const ingredients = filterKeys2.map((key, idx) => ({
				index: idx + 1,
				ingredient: data[key],
				measuer: data[`strMeasure${idx + 1}`],
			}));
			console.log(ingredients)
			setTableData(ingredients);
		}
	}, [data])
	

	return (
		<section className={clsx(styles.detail)}>
			<Title type={'slogan'}>{data?.strMeal}</Title>
			<BounceLoader
				loading={!isSuccess}
				cssOverride={{ position: 'absolute', top: 300, left: '50%', transform: 'translateX(-50%)' }}
				color={'orange'}
				size={100}
			/>
			{isSuccess && (
				<div className={clsx(styles.picFrame)}>
					<Pic imgSrc={data?.strMealThumb} alt={data?.strMeal}/>
				</div>
			)}


			<Table data={TableData} title={data?.strMeal}/>
			
		</section>
	);
}



export default Detail;

import { useRouter } from 'next/router';
import { useRecipeById } from '@/hooks/useRecipe';
import { Title } from '@/components/atoms/text/Title';
import { Pic } from '@/components/atoms/pic/Pic';
import styles from './detail.module.scss'
import clsx from 'clsx';
import { BounceLoader } from 'react-spinners';

function Detail() {
	const router = useRouter();
	const { id, name, url } = router.query;

	const { data, isSuccess, isLoading } = useRecipeById(id);
	console.log(data)

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

		</section>
	);
}



export default Detail;

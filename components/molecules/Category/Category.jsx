import Btn from '@/components/atoms/Button/Btn';
import styles from './Category.module.scss';
import clsx from 'clsx';

function Category({ items, setSelect }) {

	// console.log()

	return (
		<nav className={clsx(styles.category)}>
			{items.map((el) => (
				<Btn key={el.idCategory} onClick={() => setSelect(el.strCategory)}>{el.strCategory}</Btn>
			))}
		</nav>
	);
}

export default Category;

import InputCom from '@/components/atoms/form/InputCom';
import styles from './SearchBar.module.scss';
import clsx from 'clsx';
import Btn from '@/components/atoms/Button/Btn';
import { FiSearch } from 'react-icons/fi';

function SearchBar({ isBtn = true, btnText = 'button', inputType, value, onChange, placeholder }) {
	return (
		<div className={clsx(styles.searchBar)}>
			<InputCom type={inputType} value={value} onChange={onChange} placeholder={placeholder} />
			<FiSearch />
			{isBtn && <Btn>{btnText}</Btn>}
		</div>
	);
}

export default SearchBar;

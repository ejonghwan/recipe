import Input from '@/components/atoms/Input/Input';
import styles from './SearchBar.module.scss';
import clsx from 'clsx';
import Btn from '@/components/atoms/Button/Btn';

function SearchBar({ isBtn = true, btnContent = '버튼', inputType, value, onchange }) {
    return (
        <div className={clsx(styles.searchBar)}>
            <Input type={inputType} value={value} onchange={onchange}/>
            {isBtn && <Btn>{btnContent}</Btn>}
        </div>
    )
}

export default SearchBar;
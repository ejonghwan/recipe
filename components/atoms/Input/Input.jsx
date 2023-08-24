import styles from './Input.module.scss';
import clsx from 'clsx';

function Input({ type = 'text', placeholder = '값을 입력해주세요.', onchange, value }) {
    return (
        <input 
            type={type} 
            placeholder={placeholder} 
            className={clsx(styles.input, className)} 
            onchange={onchange} 
            value={value} 
        />
    )
}

export default Input;
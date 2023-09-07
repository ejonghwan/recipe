import styles from './InputCom.module.scss';
import clsx from 'clsx';

function InputCom({ type = 'text', placeholder = 'text', onChange, value, style, className }) {
	return <input type={type} className={clsx(styles.input)} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} style={style} />;
}

export default InputCom;

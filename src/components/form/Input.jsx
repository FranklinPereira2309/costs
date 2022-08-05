import styles from '../../styles/Input.module.css'

export default function Input({ type, name, placeholder, handleOnChange, value, text }) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name}>{text}:</label>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                onChange={handleOnChange}
                value={value || ''}
            />
        </div>
    )
}
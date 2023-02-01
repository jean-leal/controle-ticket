import styles from './Button.module.css';

const Button = ({handleClick, text}) => {
  return(
    <div className={styles.form_control}>
      <button className={styles.btn} onClick={handleClick}>
        {text}
      </button>
    </div>
  )
}

export default Button;
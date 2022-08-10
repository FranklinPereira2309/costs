import styles from '../../styles/LinkButton.module.css'
import {Link} from 'react-router-dom'

export default function LinkButton({to, text}) {
    return (
        <div>
            <Link className={styles.btn} to={to}>
                {text}
            </Link>
        </div>
    )
}
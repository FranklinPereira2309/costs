import styles from '../../styles/NavBar.module.css'
import { Link } from 'react-router-dom'
import Container from './Container'
import logo from '../../assets/costs_logo.png'

export default function NavBar() {
    return (
        <nav className={styles.navbar}>
            <div>
                <Link to='/'>
                    <img src={logo} alt="Costs" />
                </Link>

            </div>
            <div>

                <ul className={styles.list}>
                    <li className={styles.item}><Link to='/'>Home</Link></li>
                    <li className={styles.item}><Link to='/projects'>Projects</Link></li>
                    <li className={styles.item}><Link to='/company'>Company</Link></li>
                    <li className={styles.item}><Link to='/newproject'>NewProject</Link></li>
                    <li className={styles.item}><Link to='/contact'>Contact</Link></li>
                </ul>
            </div>
        </nav>
    )
}
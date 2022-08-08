import styles from '../../styles/NavBar.module.css'
import logo from '../../assets/costs_logo.png'
import { Link } from 'react-router-dom'


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
                    <li className={styles.item}><Link to='/projects'>Projetos</Link></li>
                    <li className={styles.item}><Link to='/company'>Empresa</Link></li>
                    <li className={styles.item}><Link to='/contact'>Contatos</Link></li>
                </ul>
            </div>

        </nav>
    )
}
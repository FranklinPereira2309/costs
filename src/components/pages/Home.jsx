import savings from '../../assets/savings.svg'
import styles from '../../styles/Home.module.css'

export default function Home() {
    return (
        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar os seus projetos agora mesmo!</p>
            <a href="/">Criar Projeto</a>
            <img src={savings} alt="cost" />
        </section>
    )
}
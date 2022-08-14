import styles from '../../styles/ProjectCard.module.css'
import {BsFillTrashFill} from 'react-icons/bs'

export default function ServiceCard({id, name, cost, description, handleRemove}) {

    function remove(e) {
        e.preventDefault()
        handleRemove(id, cost)
    }

    return (
        <div className={styles.project_card}>
            <h4>{name}</h4>
            <p>
                <span>Custo Total: </span>R$ {cost}
                
            </p>
            <p>
                <span>{description}</span>

            </p>
            <div className={styles.project_card_actions}>
                <button onClick={remove}>
                    <BsFillTrashFill/> Excluir
                </button>
            </div>
        </div>
    )
}
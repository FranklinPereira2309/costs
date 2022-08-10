import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from '../../styles/Project.module.css'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import Message from '../layout/Message'
import ProjectForm from '../projects/ProjectForm'

export default function Project() {
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [message, setMessage] = useState('')
    const [type, setType] = useState('')

    useEffect(() => {

        setTimeout(() => {

            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    setProject(data)
                })
                .catch(erro => console.log(erro))
        }, 1000)


    }, [id])

    function editPost(project) {

        if(project.budget < project.cost) {
            setMessage('O orçamento não pode menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(data => {
            setProject(data)
            setShowProjectForm(false)
            setMessage('Projeto atualizado!')
            setType('sucess')
        })
        .catch(erro => console.log(erro))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
        

    }


    return (
        <>
            {project.name ?
                (
                    <div className={styles.project_details}>
                        <Container customClass={'column'}>
                            {message && <Message type={type} msg={message} />}
                            <div className={styles.details_container}>
                                <h1>Projeto: {project.name}</h1>
                                <button className={styles.btn} onClick={toggleProjectForm}>{!showProjectForm ? 'Editar projeto' : 'Fechar'}</button>
                                {!showProjectForm ?
                                    (
                                        <div className={styles.project_info}>
                                            <p>Category:<span> {project.category.name}</span></p>
                                            <p>Total orçamento:<span> R$ {project.budget}</span></p>
                                            <p>Total utilizado:<span> R$ {project.cost}</span></p>
                                        </div>
                                    ) :
                                    (
                                        <div className={styles.project_info}>
                                            <ProjectForm
                                                handleSubmit={editPost}
                                                btnText='Concluir Edição'
                                                projectData={project}
                                            />
                                        </div>
                                    )
                                }
                            </div>
                        </Container>
                    </div>

                ) : (

                    <Loading />
                )
            }
        </>
    )
}
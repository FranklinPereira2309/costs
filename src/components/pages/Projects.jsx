import { useLocation } from 'react-router-dom'
import styles from '../../styles/Projects.module.css'
import Container from '../layout/Container'
import Message from '../layout/Message'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../projects/ProjectCard'
import { useState, useEffect } from 'react'
import Loading from '../layout/Loading'

export default function Projects() {

    const [projects, setProjects] = useState([])
    const [removeLoading, setRemoveLoading] = useState(false)
    const [projectMessage, setProjectMessage] = useState('')

    let location = useLocation()

    let textMessage = ''

    if (location.state) {
        textMessage = location.state.message
    }

    useEffect(() => {
        setTimeout(() => {
            fetch('http://localhost:5000/projects', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data)
                    setProjects(data)
                    setRemoveLoading(true)
                })
                .catch((err) => console.log(err))

        }, 1000)

    }, [])

    function removeProject(id) {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
        })
        .then((resp) => resp.json())
        .then(() => {
            setProjects(projects.filter((project) => project.id !== id ))
            setProjectMessage('Projeto removido com sucesso!')
        })
        .catch((erro) => console.log(erro))
    
    }


    return (
        <div className={styles.project_container}>
            <div className={styles.tittle_container}>

                <h1>Meus Projects</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
            {textMessage && <Message msg={textMessage} type='sucess' />}
            {projectMessage && <Message msg={projectMessage} type='sucess' />}
            <Container customClass='start'>
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            name={project.name}
                            id={project.id}
                            budget={project.budget}
                            category={project.category.name}
                            handleRemove={removeProject}
                        />
                    ))}
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Não há projetos cadastrados!!</p>
                )

                }
            </Container>

        </div>
    )
}
import { useLocation } from 'react-router-dom'
import styles from '../../styles/Projects.module.css'
import Container from '../layout/Container'
import Message from '../layout/Message'
import LinkButton from '../layout/LinkButton'
import ProjectCard from '../projects/ProjectCard'
import { useState, useEffect } from 'react'

export default function Projects() {

    const [projects, setProjects] = useState([])

    let location = useLocation()

    let textMessage = ''

    if (location.state) {
        textMessage = location.state.message
    }

    useEffect(() => {

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
            })
            .catch((err) => console.log(err))

    }, [])

    return (
        <div className={styles.project_container}>
            <div className={styles.tittle_container}>

                <h1>Meus Projects</h1>
                <LinkButton to='/newproject' text='Criar Projeto' />
            </div>
                {textMessage && <Message msg={textMessage} type='sucess' />}
            <Container customClass='start'>
                {projects.length > 0 &&
                    projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            name={project.name}
                            id={project.id}
                            budget={project.budget}
                            category={project.category.name}
                        />
                    ))}
            </Container>

        </div>
    )
}
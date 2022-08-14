import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from '../../styles/Project.module.css'
import Container from '../layout/Container'
import Loading from '../layout/Loading'
import Message from '../layout/Message'
import ProjectForm from '../projects/ProjectForm'
import ServiceForm from '../services/ServiceForm'
import ServiceCard from '../services/ServiceCard'
import { parse, v4 as uuidv4 } from 'uuid'

export default function Project() {
    const { id } = useParams()
    const [project, setProject] = useState([])
    const [services, setServices] = useState([])
    const [showProjectForm, setShowProjectForm] = useState(false)
    const [showServiceForm, setShowServiceForm] = useState(false)
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
                    setServices(data.service)
                })
                .catch(erro => console.log(erro))
        }, 1000)


    }, [id])

    function editPost(project) {
        setMessage('')
        if (project.budget < project.cost) {
            setMessage('O orçamento não pode menor que o custo do projeto!')
            setType('error')
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
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

    function removeService(id, cost) {
        setMessage('')
        const servicesUpdate = project.service.filter(service => service.id !== id)

        const projectUpdate = project
        projectUpdate.service = servicesUpdate

        projectUpdate.cost = parseFloat(projectUpdate.cost) - parseFloat(cost)

        fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify(projectUpdate)
        })
        .then(resp => resp.json())
        .then(data => {
            setProject(projectUpdate)
            setServices(servicesUpdate)
            setMessage('Serviço removido com sucesso!')
            setType('sucess')
        })
        .catch(error => console.log(error))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)

    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)

    }

    function createService(project) {
        setMessage('')
        const lastService = project.service[project.service.length - 1]

        lastService.id = uuidv4()

        const lastServiceCost = lastService.cost

        const newCost = parseFloat(project.cost) + parseFloat(lastServiceCost)

        if (newCost > parseFloat(project.budget)) {
            setMessage('Orçamento ultrapassado, verifique o valor do serviço')
            setType('error')
            project.service.pop()
            return false
        }

        project.cost = newCost

        
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then(resp => resp.json())
        .then(data => {
            setShowServiceForm(false)
            
            })
            .catch(error => console.log(error))

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
                            <div className={styles.service_form_container}>
                                <h2>Adiconar um serviço:</h2>
                                <button className={styles.btn} onClick={toggleServiceForm}>{!showServiceForm ? 'Adicionar serviço' : 'Fechar'}</button>
                                <div className={styles.project_info}>
                                    {showServiceForm &&
                                        <ServiceForm
                                            handleSubmit={createService}
                                            btnText='Adicionar Serviço'
                                            projectData={project}
                                        />
                                    }
                                </div>
                            </div>
                            <h2>Serviços</h2>
                            <Container customClass='start'>
                                {
                                    services.length > 0 &&
                                    services.map((service) => (
                                        <ServiceCard 
                                            key={service.id}
                                            id={service.id}
                                            name={service.name}
                                            cost={service.cost}
                                            description={service.description}
                                            handleRemove={removeService}
                                        
                                        />
                                    ))
                                    
                                }
                                {services.length === 0 && <p>Não há serviços cadastrados!</p>}
                            </Container>
                        </Container>
                    </div>

                ) : (

                    <Loading />
                )
            }
        </>
    )
}
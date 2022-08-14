import styles from '../../styles/ProjectsForm.module.css'
import { useState } from 'react'
import Input from '../form/Input'
import SubmitButton from '../form/SubmitButton'


export default function ServiceForm({handleSubmit, btnText, projectData}) {

    const [service, setService] = useState({})

    function submit(e) {
        e.preventDefault()
        projectData.service.push(service)
        handleSubmit(projectData)
        setService('')
    }

    function handleChange(e) {
        setService({...service, [e.target.name]: e.target.value})
    }

    return (
        <form onSubmit={submit} className={styles.form}>
            <Input 
            text='Nome do serviço'
            type='text'
            name='name'
            placeholder='Insira o nome do serviço'
            handleOnChange={handleChange}
            value={service.name}
            
            />
            <Input 
            text='Custo do serviço'
            type='number'
            name='cost'
            placeholder='Insira o custo do serviço'
            handleOnChange={handleChange}
            value={service.cost}
            
            />
            <Input 
            text='Desrição do serviço'
            type='text'
            name='description'
            placeholder='Descreva o serviço'
            handleOnChange={handleChange}
            value={service.description}
           
            />
            <SubmitButton text={btnText}/>
        </form>
    )
}
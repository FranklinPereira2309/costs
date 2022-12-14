import { useEffect, useState } from 'react'
import styles from '../../styles/ProjectsForm.module.css'
import Input from '../form/Input'
import Select from '../form/Select'
import SubmitButton from '../form/SubmitButton'

export default function ProjectForm({ btnText, handleSubmit, projectData }) {

    const [categories, setCategories] = useState([])
    const [project, setProject] = useState(projectData || {})

    useEffect(() => {

        fetch("http://localhost:5000/categories", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => console.log(err))


    }, [])

    
    function submit(e)  {
        e.preventDefault()
        handleSubmit(project)
    }

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value })
        
    }

    function handleCategory(e) {
        setProject({
            ...project, category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text,
            }
        })
        
    }
    
    return (
        <form
            className={styles.form}
            onSubmit={submit}
        >

            <Input
                type='text'
                text='Nome do Projeto'
                name='name'
                placeholder='Insira o nome do projeto'
                handleOnChange={handleChange}
                value={project.name? project.name : ''}
            />
            <Input
                type='number'
                text='Orçamento do Projeto'
                name='budget'
                placeholder='Insira o valor total'
                handleOnChange={handleChange}
                value={project.budget? project.budget : ''}
            />

            <div>
                <Select
                    name='category_id'
                    text='Selecione a categoria'
                    options={categories}
                    handleOnChange={handleCategory}
                    value={project.category? project.category.id : ''}
                />
            </div>
            <SubmitButton text={btnText} />
        </form>
    )
}
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { ProjectForm } from '../ProjectForm/ProjectForm'
import { FaArrowLeft } from 'react-icons/fa'
import './EditScreen.scss'
import { useSelector } from 'react-redux'

export const EditScreen = () => {

    const {projects} = useSelector(state => state)

    const {goBack} = useHistory()
    const {id} = useParams()

    const [project, setProject] = useState(null)

    useEffect(()=>{
        const pr = projects.find( pr => pr.id === Number(id))
        setProject(pr)
    }, [id, projects])

    return (
        <>
            <div className="edit-project-header">
                <div className="back-btn" onClick={goBack}>
                    <FaArrowLeft/>Back
                </div>
                <h1>Edit project</h1>
            </div>

            {project && <ProjectForm func="edit" project={project}/>}
        </>
    )
}

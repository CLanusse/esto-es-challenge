import React from 'react'
import { useHistory } from 'react-router'
import { ProjectForm } from '../ProjectForm/ProjectForm'
import { FaArrowLeft } from 'react-icons/fa'
import './CreateScreen.scss'

export const CreateScreen = () => {
    
    const { goBack } = useHistory()

    
    return (
        <>
            <div className="create-project-header">
                <div className="back-btn" onClick={goBack}>
                    <FaArrowLeft/>Back
                </div>
                <h1>Add project</h1>
            </div>
            <ProjectForm func="create"/>
        </>
    )
}

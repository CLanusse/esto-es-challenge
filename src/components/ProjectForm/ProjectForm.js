import React from 'react'
import { Form } from 'react-bootstrap'
import { Formik } from "formik"
import * as Yup from "yup"
import './ProjectForm.scss'
import { useDispatch, useSelector } from 'react-redux'
import { createProject, editProject } from '../../actions/projectsActions'
import Swal from 'sweetalert2'
import { useHistory } from 'react-router'


// recibo parámetro para saber si el form se usará para
// crear o editar un proyecto

export const ProjectForm = ({func, project}) => {

    const {goBack} = useHistory()
   
    const dispatch = useDispatch()
    const {staff} = useSelector( state => state)


    const formSchema = Yup.object().shape({
		name: Yup.string()
			.min(3, "Nombre inválido, demasiado corto")
			.required("Este campo es obligatorio"),
		description: Yup.string()
            .min(10, "Descripción inválida, demasiado corta")
            .max(250, "Descripción inválida, demasiado larga")
            .required("Este campo es obligatorio"),
        projectManager: Yup.string().matches(/\d/, "Elija una opción"),
        assignedTo: Yup.string().matches(/\d/, "Elija una opción")
	})

	const initialValues = {
		name: project?.name || "",
		description: project?.description || "",
		projectManager: project?.projectManager || "empty",
		assignedTo: project?.assignedTo || "empty",
        status: project?.status || "Enabled"
	}


    return (
        <Formik
            initialValues={initialValues}
			validationSchema={formSchema}
            onSubmit={(values) => {
                // según la función del form, se hace dispatch de crear o editar
                if (func === "create") {
                    dispatch( createProject({
                        ...values,
                        projectManager: Number(values.projectManager),
                        assignedTo: Number(values.assignedTo),
                    }) )
                    Swal.fire({
                        title: 'Listo!',
                        icon: 'success',
                        text: "Projecto creado con éxito",
                        timer: 2000,
                        confirmButtonText: 'Genial!',
                        timerProgressBar: true,
                        willClose: () => {
                          goBack()
                        }
                      })
                } else if (func === "edit") {
                    dispatch( editProject({
                        ...project,
                        ...values,
                        projectManager: Number(values.projectManager),
                        assignedTo: Number(values.assignedTo),
                    }) )
                    Swal.fire({
                        title: 'Listo!',
                        icon: 'success',
                        text: "Projecto editado con éxito",
                        timer: 2000,
                        confirmButtonText: 'Genial!',
                        timerProgressBar: true,
                        willClose: () => {
                          goBack()
                        }
                      })
                }
            }}
        >
            {(formik) => (
                <div className="project-form-container">
                
                <Form onSubmit={formik.handleSubmit}> 
                    <Form.Group className="mb-4" controlId="formName">
                        <Form.Label>Project name</Form.Label>
                            <input
                                title="Titulo"
                                type="text"
                                name="name"
                                className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values.name}
                            />
                        {formik.touched.name && formik.errors.name ? <p className="mt-1 text-danger">{formik.errors.name}</p> : null}
                    </Form.Group>
                    <Form.Group className="mb-4" controlId="formName">
                        <Form.Label>Description</Form.Label>
                            <input
                                title="Titulo"
                                type="text"
                                name="description"
                                className="form-control"
                                onChange={formik.handleChange}
                                value={formik.values.description}
                            />
                            {formik.touched.description && formik.errors.description ? <p className="mt-1 text-danger">{formik.errors.description}</p> : null}
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Project manager</Form.Label>
                        <Form.Control 
                            required as="select" 
                            name="projectManager" 
                            onChange={formik.handleChange}
                            value={formik.values.projectManager}
                        >

                            <option value="empty">Select a person</option>
                            {staff.map((member) => {
                                return (
                                    <option key={member.id} value={member.id}>{member.name}</option>
                                )
                            })}
                        </Form.Control>
                        {formik.touched.projectManager && formik.errors.projectManager ? <p className="mt-1 text-danger">{formik.errors.projectManager}</p> : null}
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Assigned to</Form.Label>
                        <Form.Control 
                            required as="select" 
                            name="assignedTo" 
                            onChange={formik.handleChange}
                        >
                            <option value="empty">Select a person</option>
                            {staff.map((member) => {
                                return (
                                    <option key={member.id} value={member.id}>{member.name}</option>
                                )
                            })}
                        </Form.Control>
                        {formik.touched.assignedTo && formik.errors.assignedTo ? <p className="mt-1 text-danger">{formik.errors.assignedTo}</p> : null}
                    </Form.Group>
                    <Form.Group className="mb-4">
                        <Form.Label>Status</Form.Label>
                        <Form.Control 
                            required as="select" 
                            name="status" 
                            onChange={formik.handleChange}
                        >
                            <option value="Enabled">Enabled</option>
                            <option value="Disabled">Disabled</option>
                        </Form.Control>
                    </Form.Group>

                    <button 
                        className="project-btn"
                        type="submit"
                    >
                        {func === "create" ? "Create project" : "Edit project"}
                    </button>
                </Form>
            </div>
            )}

        </Formik>
    )
}

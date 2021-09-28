import React, { useEffect, useState } from 'react'
import './ProjectList.scss'
import { Link } from 'react-router-dom'
import { FaEllipsisV, FaRegEdit, FaTrash } from 'react-icons/fa'
import moment from 'moment'
import { Dropdown, Form } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProject } from '../../actions/projectsActions'
import Swal from 'sweetalert2'

export const ProjectList = () => {

    const dispatch = useDispatch()

    const {staff} = useSelector( state => state)
    const {projects} = useSelector( state => state)

    const [data, setData] = useState([])
    const [query, setQuery] = useState("")
    // function que genera el JSC para imagen y nombre del miembro correspondiente
    // según la data de miembros
    const getStaff = (staffId) => {
        const member = staff.find( el => el.id === staffId)

        return (
            <>
                <img src={member.img} alt={member.name}/>
                <p>{member.name}</p>
            </>
        )
    }

    // control input búsqueda
    const handleSearch = (query) => {
        setData( projects.filter( pr => pr.name.toLowerCase().includes(query.toLowerCase())) )
    }
    const handleChange = (e) => {
        setQuery(e.target.value)
    }

    // control borrar projecto
    const handleDelete = (id) => {
        Swal.fire({
            title: 'Estás seguro?',
            text: "No podrás deshacer esta acción",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, borrar!',
            cancelButtonText: 'No, cancelar!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch( deleteProject(id) )
            }
        })
    }

    // effect para el buscador
    useEffect(()=>{
        query.length > 2 ? handleSearch(query) : setData(projects)
    }, [query, projects])

    return (
        <>
            <div className="project-list-header">
                <h1>My projects</h1>

                <Link to="/create" className="project-btn">
                    + Add project
                </Link>
            </div>

            <Form className="search">
                <input
                    className="form-control "
                    name="query"
                    value={query}
                    onChange={handleChange}
                    type="text"
                    placeholder="Buscar proyecto"
                    autoComplete="off"
                />
            </Form>
            
            <table className="project-list-table">
                <thead>
                    <tr>
                        <th>Project Info</th>
                        <th>Project Manager</th>
                        <th>Assigned to</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map( project => (
                            <tr key={project.id} className="pr-item">
                                <td className="pr-info">
                                    <p>{project.name}</p>
                                    <p>Created at: {moment(project.creationDate).format('DD/MM/YYYY hh:mm a')}</p>
                                </td>
                                <td className="pr-manager">
                                    <div>
                                        {getStaff(project.projectManager)}
                                    </div>
                                </td>
                                <td className="pr-assigned"> 
                                    <div>
                                        {getStaff(project.assignedTo)}
                                    </div>
                                </td>
                                <td className="pr-status">
                                    {project.status}
                                </td>
                                <td className="pr-actions">
                                    <Dropdown>
                                        <Dropdown.Toggle>
                                            <FaEllipsisV/>
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="actions-menu">
                                            <Dropdown.Item >
                                                <Link to={`/edit/${project.id}`}  className="actions-edit"><FaRegEdit/>Edit</Link>
                                            </Dropdown.Item>
                                            <Dropdown.Divider />
                                            <Dropdown.Item 
                                                className="actions-delete"
                                                onClick={()=> handleDelete(project.id)}
                                            >
                                                    <FaTrash/>Delete
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </td>
                            </tr>
                            
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

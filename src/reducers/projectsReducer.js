import { types } from "../types/types"

const initialState =  [
    {
        id: 1,
        name: "Landing Page",
        description: "Lorem ipsum landing page",
        projectManager: 1,
        assignedTo: 2,
        creationDate: new Date(),
        status: "Enabled"
    },
    {
        id: 2,
        name: "E-Commerce Shop",
        description: "Lorem ipsum E-Commerce Shop",
        projectManager: 1,
        assignedTo: 2,
        creationDate: new Date(),
        status: "Enabled"
    },
    {
        id: 3,
        name: "CRM Linkroom",
        description: "Lorem ipsum CRM Linkroom",
        projectManager: 1,
        assignedTo: 2,
        creationDate: new Date(),
        status: "Enabled"
    }
]

export const projectsReducer = (state = initialState, action) => {

    switch( action.type ) {
        case types.create:
            const newProject = {
                ...action.payload,
                id: state.length + 1,
                creationDate: new Date()
            }
            return [
                ...state, newProject
            ]
            
        case types.edit:
            const newState = state.filter( pr => pr.id !== action.payload.id)
            return [
                ...newState, action.payload
            ]
    
        case types.delete:
            return state.filter( pr => pr.id !== action.payload)
            
        default:
            return state;
    }
}
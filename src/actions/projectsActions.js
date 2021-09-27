import { types } from "../types/types";

export const deleteProject = (id) => {
    return {
        type: types.delete,
        payload: id
    }
}

export const createProject = (project) => {
    return {
        type: types.create,
        payload: project
    }
}

export const editProject = (project) => {
    return {
        type: types.edit,
        payload: project
    }
}
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';
import { projectsReducer } from '../reducers/projectsReducer';
import { staffReducer } from '../reducers/staffReducer';

// import { authReducer } from '../reducers/authReducer'
// import { postsReducer } from '../reducers/postsReducer';
// import { uiReducer } from '../reducers/uiReducer';

const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


const reducers = combineReducers({
    projects: projectsReducer,
    staff: staffReducer
    // auth: authReducer,
    // ui: uiReducer,
    // posts: postsReducer
})

export const store = createStore(
    reducers,
    composeEnhancers(
        applyMiddleware(thunk)
    )
)
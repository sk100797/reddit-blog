import { combineReducers } from 'redux'

const selectedReddit = (state='reactjs',action) => {
    return state
}

export default combineReducers({
    selectedReddit
})
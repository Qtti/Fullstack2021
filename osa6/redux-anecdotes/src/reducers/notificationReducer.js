const initialState = ""

export const setNotification = (content, delay) => {
    ///showNotification(content)
    return async dispatch => { 
        
        dispatch({
            type: 'SHOW',
            data: content
        })
        setTimeout(() => {
            dispatch({
                type: 'HIDE',
                data: ""
            })
        }, delay * 1000)
    }
}

const notificationReducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SHOW':
            return action.data
        case 'HIDE':
            return initialState
        default:
            return state
    }
}
export default notificationReducer
let timeoutid

export const setNotification = (content, delay) => {
    ///showNotification(content)
    return async dispatch => { 
        window.clearTimeout(timeoutid);

        dispatch({
            type: 'SHOW',
            data: content
        })
        timeoutid = window.setTimeout(() => {
            dispatch({
                type: 'HIDE',
                data: ""
            })
        }, delay * 1000)
    }
}

const notificationReducer = (state = "", action) => {
    switch(action.type) {
        case 'SHOW':
            return action.data
        case 'HIDE':
            return ""
        default:
            return state
    }
}
export default notificationReducer
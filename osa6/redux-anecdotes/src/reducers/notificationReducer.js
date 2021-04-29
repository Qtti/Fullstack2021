const initialState = ""

export const showNotification = (content) => {
    console.log("Show", content)
    return {
        type: 'SHOW',
        data: content
    }
}

export const hideNotification = () => {
    console.log("Hide")
    return {
        type: 'HIDE',
        data: ""
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
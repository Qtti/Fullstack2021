const initialState = "Test notification"

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case 'SHOW':
            return state
        default:
            return state
    }
}
export default reducer
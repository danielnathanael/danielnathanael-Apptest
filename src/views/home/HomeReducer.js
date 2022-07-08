const INITIAL_STATE = {
    loading: false,
    contacts: []
}

const homeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: action.loading
            }
        case 'LOAD_PAGE':
            return {
                ...state,
                contacts: action.contacts
            }
        default:
            return state
    }
}

export default homeReducer
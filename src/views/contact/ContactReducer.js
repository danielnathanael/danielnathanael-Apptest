const INITIAL_STATE = {
    loading: false,
    contact: null,
}

const contactReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'CONTACT_LOADING':
            return {
                ...state,
                loading: action.loading,
            }
        case 'CONTACT_LOAD_PAGE':
            return {
                ...state,
                contact: action.contact,
            }
        default:
            return state
    }
}

export default contactReducer
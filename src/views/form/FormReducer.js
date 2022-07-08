const INITIAL_STATE = {
    id: null,
    photo: 'N/A',
    firstName: '',
    firstNameError: null,
    lastName: '',
    lastNameError: null,
    age: '',
    ageError: null,
    submitDisabled: true,
}

const formReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case 'FORM_CHANGE_ID':
            return {
                ...state,
                id: action.id,
            }
        case 'FORM_CHANGE_PHOTO':
            return {
                ...state,
                photo: action.photo,
            }
        case 'FORM_CHANGE_FIRST_NAME':
            return {
                ...state,
                firstName: action.firstName,
            }
        case 'FORM_CHANGE_FIRST_NAME_ERROR':
            return {
                ...state,
                firstNameError: action.firstNameError,
            }
        case 'FORM_CHANGE_LAST_NAME':
            return {
                ...state,
                lastName: action.lastName,
            }
        case 'FORM_CHANGE_LAST_NAME_ERROR':
            return {
                ...state,
                lastNameError: action.lastNameError,
            }
        case 'FORM_CHANGE_AGE':
            return {
                ...state,
                age: action.age,
            }
        case 'FORM_CHANGE_AGE_ERROR':
            return {
                ...state,
                ageError: action.ageError,
            }
        case 'FORM_RESET':
            return INITIAL_STATE
        default:
            return state
    }
}

export default formReducer
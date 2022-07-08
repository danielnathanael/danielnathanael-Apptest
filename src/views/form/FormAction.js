export const changeId = (id) => {
    return {
        type: 'FORM_CHANGE_ID',
        id: id,
    }
}

export const changePhoto = (photo) => {
    return {
        type: 'FORM_CHANGE_PHOTO',
        photo: photo,
    }
}

export const changeFirstName = (firstName) => {
    return {
        type: 'FORM_CHANGE_FIRST_NAME',
        firstName: firstName,
    }
}

export const changeFirstNameError = (firstNameError) => {
    return {
        type: 'FORM_CHANGE_FIRST_NAME_ERROR',
        firstNameError: firstNameError,
    }
}

export const changeLastName = (lastName) => {
    return {
        type: 'FORM_CHANGE_LAST_NAME',
        lastName: lastName,
    }
}

export const changeLastNameError = (lastNameError) => {
    return {
        type: 'FORM_CHANGE_LAST_NAME_ERROR',
        lastNameError: lastNameError,
    }
}

export const changeAge = (age) => {
    return {
        type: 'FORM_CHANGE_AGE',
        age: age,
    }
}

export const changeAgeError = (ageError) => {
    return {
        type: 'FORM_CHANGE_AGE_ERROR',
        ageError: ageError,
    }
}

export const reset = () => {
    return {
        type: 'FORM_RESET'
    }
}

export default {
    changeId,
    changePhoto,
    changeFirstName,
    changeFirstNameError,
    changeLastName,
    changeLastNameError,
    changeAge,
    changeAgeError,
    reset,
}
const baseUrl = 'https://simple-contact-crud.herokuapp.com'

const getContacts = async () => {
    const result = await fetch(`${baseUrl}/contact`, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => res.json())
    .catch(err => err)

    return result
}

const getContact = async (id) => {
    const result = await fetch(`${baseUrl}/contact/${id}`, {
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => res.json())
    .catch(err => err)

    return result
}

const createContact = async (photo, firstName, lastName, age) => {
    let body = new FormData()
    body.append('photo', photo)
    body.append('firstName', firstName)
    body.append('lastName', lastName)
    body.append('age', age)

    const result = await fetch(`${baseUrl}/contact`, {
        method: 'post',
        body: body,
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => res.json())
    .catch(err => err)

    return result
}

const updateContact = async (id, photo, firstName, lastName, age) => {
    let body = new FormData()
    body.append('photo', photo)
    body.append('firstName', firstName)
    body.append('lastName', lastName)
    body.append('age', age)

    const result = await fetch(`${baseUrl}/contact/${id}`, {
        method: 'put',
        body: body,
        headers: {
            'Accept': 'application/json'
        }
    }).then(res => res.json())
    .catch(err => err)

    return result
}

const removeContact = async (id) => {
    const result = await fetch(`${baseUrl}/contact/${id}`, {
        method: 'delete',
    }).then(res => res.json())
    .catch(err => err)

    return result
}

export default {
    getContacts,
    getContact,
    createContact,
    updateContact,
    removeContact,
}
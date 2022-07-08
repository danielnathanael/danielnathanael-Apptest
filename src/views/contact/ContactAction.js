export const setLoading = (loading) => {
    return {
        type: 'CONTACT_LOADING',
        loading: loading,
    }
}

export const loadPage = (contact) => {
    return {
        type: 'CONTACT_LOAD_PAGE',
        contact: contact,
    }
}

export default {
    setLoading,
    loadPage,
}
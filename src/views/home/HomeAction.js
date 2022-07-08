export const setLoading = (loading) => {
    return {
        type: 'LOADING',
        loading: loading,
    }
}

export const loadPage = (contacts) => {
    return {
        type: 'LOAD_PAGE',
        contacts: contacts
    }
}

export default {
    setLoading,
    loadPage
}
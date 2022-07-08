import ContactService from "../src/services/ContactService"
import 'isomorphic-fetch'


/// Test GET all contact result, each data must be in correct data types
test('Get all contact', async () => {
    let result = await ContactService.getContacts()
    
    expect(Array.isArray(result.data)).toBe(true)
    for(let contact of result.data) {
        expect(typeof contact.id === 'string').toBe(true)
        expect(typeof contact.photo === 'string').toBe(true)
        expect(typeof contact.firstName === 'string').toBe(true)
        expect(typeof contact.lastName === 'string').toBe(true)
        expect(typeof contact.age === 'number').toBe(true)
    }
})
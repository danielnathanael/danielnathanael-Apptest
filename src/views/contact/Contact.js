import React from 'react'
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native'
import BodyContainer from '../../layouts/BodyContainer'
import { connect } from 'react-redux'
import { useEffect } from 'react'
import ContactAction from './ContactAction'
import ContactService from '../../services/ContactService'
import Icon from 'react-native-vector-icons/MaterialIcons'

const Contact = (props) => {
    const loading = props.loading
    const contact = props.contact
    const ageErrorMessage = props.ageErrorMessage

    useEffect(() => {
        props.loadPage(props.route.params.id)
    }, [])

    if (loading === false && contact !== undefined && contact !== null && contact !== {}) {
        const styles = StyleSheet.create({
            headerContainer: {
                padding: 16,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            },
            headerLeading: {
                flex: 1,
            },
            headerLabel: {
                flex: 1,
                fontSize: 24,
                fontWeight: 'bold',
            },
            headerAction: {
                flex: 1,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
            },
            headerIcon: {
                borderRadius: 4,
                backgroundColor: '#0bd39e',
                padding: 4,
            },
            container: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            },
            avatar: {
                width: 100,
                height: 100,
                borderRadius: 50,
                backgroundColor: 'grey',
                display: 'flex',
                backgroundColor: 'grey',
                justifyContent: 'center',
                alignItems: 'center',
            },
            avatarName: {
                fontSize: 24,
            },
            avatarContainer: {
                margin: 32,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
            },
            name: {
                fontSize: 24,
                textAlign: 'center',
                fontWeight: 'bold',
            },
            ageContainer: {
                padding: 16,
            },
            ageLabel: {
                fontSize: 16,
                marginBottom: 4,
                fontWeight: 'bold',
            },
            ageInput: {
                borderColor: '#191b31',
                borderWidth: 2,
                backgroundColor: '#1e223d',
                borderRadius: 8,
                paddingVertical: 4,
                paddingHorizontal: 8,
            },
            ageError: {
                fontSize: 12,
                color: '#eb496e',
            }
        })

        let photo = <View style={styles.avatar}>
            <Text style={styles.avatarName}>{`${contact.firstName[0]}${contact.lastName[0]}`}</Text>
        </View>
        if (contact.photo !== 'N/A') {
            photo = <Image
                source={{ uri: contact.photo }}
                style={styles.avatar}
            />
        }

        return <BodyContainer>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeading}></View>
                <Text style={styles.headerLabel}>Contacts</Text>
                <TouchableOpacity
                    style={styles.headerAction}
                    activeOpacity={0.6}
                    onPress={() => props.navigateToForm(props.navigation, {
                        id: contact.id,
                        photo: contact.photo,
                        firstName: contact.firstName,
                        lastName: contact.lastName,
                        age: contact.age,
                    })}
                >
                    <Icon name='edit' size={24} color='white' style={styles.headerIcon} />
                </TouchableOpacity>
            </View>
            <View styles={styles.container}>
                <View style={styles.avatarContainer}>
                    {photo}
                </View>
                <Text style={styles.name}>{`${contact.firstName} ${contact.lastName}`}</Text>
                <View style={styles.ageContainer}>
                    <Text style={styles.ageLabel}>Age</Text>
                    <TextInput
                        placeholder='Enter Age'
                        style={styles.ageInput}
                        keyboardType='numeric'
                        value={contact.age.toString()}
                        editable={false}
                    />
                    <Text style={styles.ageError}>{ageErrorMessage}</Text>
                </View>
            </View>
        </BodyContainer>
    }

    const styles = StyleSheet.create({
        loadingContainer: {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignSelf: 'center',
        },
    })

    return <BodyContainer>
        <View style={styles.loadingContainer}>
            <ActivityIndicator
                color='white'
                size='small'
            />
        </View>
    </BodyContainer>
}

const mapStateToProps = (state) => {
    const { contact } = state
    return contact
}

const mapDispatchToProps = (dispatch) => {
    const loadPage = async (id) => {
        dispatch(ContactAction.setLoading(true))
        let result = await ContactService.getContact(id)
        dispatch(ContactAction.loadPage(result.data))
        dispatch(ContactAction.setLoading(false))
    }

    const navigateToContact = async (navigation) => {
        navigation.navigate('Contact')
    }

    const navigateToForm = async (navigation, {id, photo, firstName, lastName, age}) => {
        navigation.navigate('Form', {
            id: id,
            photo: photo,
            firstName: firstName,
            lastName: lastName,
            age: age,
        })
    }

    return {
        loadPage,
        navigateToContact,
        navigateToForm,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Contact)
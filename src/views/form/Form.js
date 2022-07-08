import React, { useEffect } from 'react'
import { Text, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import BodyContainer from '../../layouts/BodyContainer'
import { connect } from 'react-redux'
import FormAction from './FormAction'
import ContactService from '../../services/ContactService'
import { CommonActions, useIsFocused } from '@react-navigation/native'

const Form = (props) => {

    const isFocused = useIsFocused()

    useEffect(() => {

        /// Clean the form from previous state if there are any
        props.resetForm()

        /// Retrieving data from contact detail page (for update)
        if (props.route.params !== undefined) {
            const params = props.route.params
            if (params.id !== undefined) {
                props.changeId(params.id)
            }
            if (params.photo !== undefined) {
                props.changePhoto(params.photo)
            }
            if (params.firstName !== undefined) {
                props.changeFirstName(params.firstName)
            }
            if (params.lastName !== undefined) {
                props.changeLastName(params.lastName)
            }
            if (params.age !== undefined) {
                props.changeAge(params.age)
            }
        }
    }, [isFocused])

    return <BodyContainer>
        <View style={styles.headerContainer}>
            <View style={styles.headerLeading}></View>
            <Text style={styles.headerLabel}>Contacts</Text>
            <View style={styles.headerIconContainer}>
                {
                    props.state.id != null ?
                        <TouchableOpacity
                            style={styles.headerAction}
                            activeOpacity={0.6}
                            onPress={() => props.remove(props.navigation, props.state.id)}
                        >
                            <Icon name='delete' size={24} color='white' style={styles.headerRemoveIcon} />
                        </TouchableOpacity>
                        :
                        <View></View>
                }
                <TouchableOpacity
                    style={styles.headerAction}
                    activeOpacity={0.6}
                    onPress={() => props.submit(props.navigation, props.state)}
                >
                    <Icon name='save' size={24} color='white' style={styles.headerAddIcon} />
                </TouchableOpacity>
            </View>
        </View>
        <View>
            <View style={styles.formContainer}>
                <Text>Photo URL</Text>
                <TextInput
                    placeholder='Enter Photo URL'
                    style={styles.formInput}
                    defaultValue={props.state.photo}
                    editable={false}
                />
                <Text style={styles.inputError}></Text>
            </View>
            <View style={styles.formContainer}>
                <Text>First Name</Text>
                <TextInput
                    placeholder='Enter First Name'
                    style={styles.formInput}
                    defaultValue={props.state.firstName}
                    onChangeText={(text) => props.changeFirstName(text)}
                />
                <Text style={styles.inputError}>{props.state.firstNameError}</Text>
            </View>
            <View style={styles.formContainer}>
                <Text>Last Name</Text>
                <TextInput
                    placeholder='Enter Last Name'
                    style={styles.formInput}
                    defaultValue={props.state.lastName}
                    onChangeText={(text) => props.changeLastName(text)}
                />
                <Text style={styles.inputError}>{props.state.lastNameError}</Text>
            </View>
            <View style={styles.formContainer}>
                <Text>Age</Text>
                <TextInput
                    placeholder='Enter Age'
                    style={styles.formInput}
                    keyboardType='numeric'
                    defaultValue={props.state.age.toString()}
                    onChangeText={(text) => props.changeAge(text)}
                />
                <Text style={styles.inputError}>{props.state.ageError}</Text>
            </View>
        </View>
    </BodyContainer>
}

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
        marginLeft: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    headerIconContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    headerRemoveIcon: {
        borderRadius: 4,
        backgroundColor: '#de496d',
        padding: 4,
    },
    headerAddIcon: {
        borderRadius: 4,
        backgroundColor: '#0bd39e',
        padding: 4,
    },
    formContainer: {
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    formInput: {
        marginTop: 4,
        borderColor: '#191b31',
        borderWidth: 2,
        backgroundColor: '#1e223d',
        borderRadius: 8,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    inputError: {
        fontSize: 12,
        color: '#eb496e',
    }
})

const mapStateToProps = (state) => {
    const { form } = state
    return {
        state: form
    }
}

const mapDispatchToProps = (dispatch, stateProps) => {
    const changeId = (id) => {
        dispatch(FormAction.changeId(id))
    }

    const changePhoto = (photo) => {
        dispatch(FormAction.changePhoto(photo))
    }

    const changeFirstName = (firstName) => {
        if (firstName.length < 3) {
            dispatch(FormAction.changeFirstNameError('Invalid First Name'))
        } else {
            dispatch(FormAction.changeFirstNameError(null))
            dispatch(FormAction.changeFirstName(firstName))
        }
    }

    const changeLastName = (lastName) => {
        if (lastName.length < 3) {
            dispatch(FormAction.changeLastNameError('Invalid Last Name'))
        } else {
            dispatch(FormAction.changeLastNameError(null))
            dispatch(FormAction.changeLastName(lastName))
        }
    }

    const changeAge = (age) => {
        if (age.length === 0 || isNaN(age) || age % 1 !== 0 || age < 1) {
            dispatch(FormAction.changeAgeError('Invalid Age'))
        } else {
            dispatch(FormAction.changeAgeError(null))
            dispatch(FormAction.changeAge(age))
        }
    }

    const remove = async (navigation, id) => {
        let result = await ContactService.removeContact(id)

        console.log(result)

        navigation.dispatch(CommonActions.reset({
            index: 1,
            routes: [
                { 'name': 'Home' }
            ]
        }))
    }

    const submit = async (navigation, state) => {
        changeFirstName(state.firstName)
        changeLastName(state.lastName)
        changeAge(state.age)

        if (state.firstNameError === null && state.lastNameError === null && state.ageError === null) {
            if (state.id !== null) {
                let result = await ContactService.updateContact(state.id, state.photo, state.firstName, state.lastName, state.age)
            } else {
                let result = await ContactService.createContact(state.photo, state.firstName, state.lastName, state.age)
            }

            navigation.dispatch(CommonActions.reset({
                index: 1,
                routes: [
                    { 'name': 'Home' }
                ]
            }))
        }
    }

    const resetForm = () => {
        dispatch(FormAction.reset())
    }

    return {
        changeId,
        changePhoto,
        changeFirstName,
        changeLastName,
        changeAge,
        remove,
        submit,
        resetForm,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
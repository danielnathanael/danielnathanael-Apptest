import React, { useEffect } from 'react'
import { FlatList, Text, View, StyleSheet, Image, ActivityIndicator, Pressable, TouchableOpacity } from 'react-native'
import BodyContainer from '../../layouts/BodyContainer'
import { connect } from 'react-redux'
import HomeAction from './HomeAction'
import ContactService from '../../services/ContactService'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useIsFocused } from '@react-navigation/native'

const Home = (props) => {

    const isFocused = useIsFocused()

    useEffect(() => {
        props.loadPage()
    }, [isFocused])

    return <BodyContainer>
        <View style={styles.headerContainer}>
            <View style={styles.headerLeading}></View>
            <Text style={styles.headerLabel}>Contacts</Text>
            <TouchableOpacity
                style={styles.headerAction}
                activeOpacity={0.6}
                onPress={() => props.navigateToCreateForm(props.navigation)}
            >
                <Icon name='add' size={24} color='white'  style={styles.headerIcon} />
            </TouchableOpacity>
        </View>
        {
            props.loading ?
                <View style={styles.loadingContainer}>
                    <ActivityIndicator
                        color='white'
                        size='small'
                    />
                </View>
                :
                <FlatList
                    keyExtractor={(item, index) => index}
                    style={styles.contactList}
                    data={props.contacts}
                    renderItem={({ index, item }) => {
                        const styles = StyleSheet.create({
                            container: {
                                backgroundColor: '#1f233d',
                                padding: 8,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                borderRadius: 8,
                                borderColor: '#1a1c32',
                                borderWidth: 2,
                            },
                            leftSection: {
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                            },
                            avatar: {
                                width: 40,
                                height: 40,
                                borderRadius: 50,
                                display: 'flex',
                                backgroundColor: 'grey',
                                justifyContent: 'center',
                                alignItems: 'center',
                            },
                            name: {
                                marginHorizontal: 16,
                                fontSize: 16,
                                color: 'lightgrey',
                                fontWeight: 'bold',
                            },
                            button: {
                                fontSize: 24,
                            }
                        })

                        let image = <View style={styles.avatar}>
                            <Text>{`${item.firstName[0]}${item.lastName[0]}`}</Text>
                        </View>

                        if (item.photo !== 'N/A') {
                            image = <Image
                                source={{ uri: item.photo }}
                                style={styles.avatar}
                            />
                        }

                        return <TouchableOpacity
                            key={index}
                            style={styles.container}
                            activeOpacity={0.6}
                            onPress={() => props.navigateToContact(props.navigation, item.id)}
                        >
                            <View style={styles.leftSection}>
                                {image}
                                <Text style={styles.name}>{`${item.firstName} ${item.lastName}`}</Text>
                            </View>
                            <Pressable>
                                <Icon
                                    name='chevron-right'
                                    style={styles.button}
                                />
                            </Pressable>
                        </TouchableOpacity>
                    }}
                    ItemSeparatorComponent={() => {
                        const styles = StyleSheet.create({
                            separator: {
                                height: 4,
                            }
                        })

                        return <View style={styles.separator} />
                    }}
                />
        }
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
    loadingContainer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
    },
    contactList: {
        flex: 1,
        padding: 8,
    }
})

const mapStateToProps = (state) => {
    const { home } = state
    return home
}

const mapDispatchToProps = (dispatch) => {
    const loadPage = async () => {
        dispatch(HomeAction.setLoading(true))
        let result = await ContactService.getContacts()
        dispatch(HomeAction.loadPage(result.data))
        dispatch(HomeAction.setLoading(false))
    }

    const navigateToContact = async (navigation, id) => {
        navigation.navigate('Contact', {
            id: id
        })
    }

    const navigateToCreateForm = async (navigation) => {
        navigation.navigate('Form')
    }

    return {
        loadPage,
        navigateToContact,
        navigateToCreateForm,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
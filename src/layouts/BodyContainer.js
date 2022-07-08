import React from 'react'
import { StyleSheet, View } from 'react-native'

const BodyContainer = ({ children }) => {
    return <View style={styles.container}>
        {children}
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1c1e36'
    }
})

export default BodyContainer
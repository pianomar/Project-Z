import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { SCREENS } from '../../misc/Constants'

export default function Landing({ navigation }) {
    return (
        <View style={styles.landingContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate(SCREENS.register)}
            >
                <Text>Registrarse</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate(SCREENS.login)}
            >
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    landingContainer: {
        flex: 1,
        justifyContent: 'center'
    }
})
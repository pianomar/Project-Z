import React from 'react'
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native'
import { SCREENS } from '../../misc/Constants'
import commonStyles from '../../styles/commonStyles'
import Background from './Background'

export default function Landing({ navigation }) {

    return (
        <View style={styles.landingContainer}>
            <Background />

            <Text style={styles.welcome}>
                Bienvenidos a Proyecto Z
            </Text>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity
                    style={[commonStyles.authButton, { marginTop: 'auto' }]}
                    onPress={() => navigation.navigate(SCREENS.login)}
                >
                    <Text style={commonStyles.authButtonText}>Ingresar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.navigate(SCREENS.register)}
                >
                    <Text style={styles.singupButton}>No tienes cuenta todavia? Registrate</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    landingContainer: {
        flex: 1
    },
    welcome: {
        fontSize: 48,
        fontWeight: 'bold',
        alignSelf: 'baseline',
        height: "50%",
        textAlignVertical: 'bottom',
        marginStart: 20
    },
    singupButton: {
        marginTop: 48,
        fontSize: 18
    },
    buttonsContainer: {
        flex: 1,
        flexDirection: 'column',
        paddingBottom: 96,
        alignItems: 'center'
    }

})
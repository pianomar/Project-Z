import { StyleSheet } from 'react-native'
import { COLORS, DIMENS } from '../misc/Constants'

const commonStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
    button: {
        backgroundColor: COLORS.accent,
        margin: 20,
        width: DIMENS.buttonSize,
        height: DIMENS.buttonSize,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: DIMENS.buttonRadius
    },
    input: {
        height: DIMENS.buttonSize,
        borderColor: COLORS.active,
        backgroundColor: 'white',
        borderWidth: 1,
        paddingLeft: 10,
        borderRadius: 50,
        width: "100%",
    },
    authButton: {
        backgroundColor: COLORS.activeLighter,
        borderRadius: 50,
        width: "60%",
        height: 72,
    },
    authButtonText: {
        color: 'white',
        fontSize: 24,
        alignSelf: 'center',
        textAlignVertical: 'center',
        height: "100%"
    }
})

export default commonStyles
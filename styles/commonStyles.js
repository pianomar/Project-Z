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
})

export default commonStyles
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, DIMENS, SCREENS } from '../../misc/Constants'

const UserSearchItem = ({ item }) => {
    const navigation = useNavigation()
    return (
        <View style={styles.userItemContainer}>
            <TouchableOpacity
                style={styles.userItem}
                onPress={() => {
                    navigation.navigate(SCREENS.profile, { uid: item.id })
                }}>
                <Text>{item.name}</Text>
                <Text>{item.email}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    userItem: {
        borderWidth: 1,
        borderColor: COLORS.activeLighter,
        borderRadius: DIMENS.imageRadius,
        alignItems: 'flex-start',
        flex: 1,
        padding: 20,
        marginTop: 10,
        width: '100%',
        backgroundColor: 'white'
    },
    userItemContainer: {
        width: '100%'
    }
})

export default UserSearchItem
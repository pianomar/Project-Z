import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { COLORS, DIMENS, STRINGS } from '../../misc/Constants'

const FeedItem = ({ item }) => {

    const now = new Date()

    const getAgoPosted = () => {
        const secondsSinceEpoch = Math.round(now.getTime() / 1000)
        const creationSeconds = Math.round(item.creation.seconds)
        const daysAmount = Math.floor((secondsSinceEpoch - creationSeconds) / 3600 / 24)
        return (STRINGS.datePre + daysAmount + " " + (daysAmount > 1 ? STRINGS.days : STRINGS.day))
    }

    return (
        <View>
            <View>
                <Text
                    style={styles.posterText}>{item.userName}</Text>
                <Text
                    style={styles.dateText}>{getAgoPosted()}</Text>
            </View>
            <Image
                style={styles.image}
                source={{ uri: item.downloadURL }}
            />
            <Text
                style={styles.caption}
            >{item.caption}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
        borderRadius: DIMENS.imageRadius,
        borderWidth: 1,
        borderColor: "#D2D2D2",
        marginStart: 5
    },
    posterText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        color: COLORS.active,
    },
    dateText: {
        marginBottom: 10,
        color: COLORS.inactive
    },
    caption: {
        color: COLORS.activeLighter,
        marginTop: 5,
        marginStart: 5
    }
})

export default FeedItem
import React from 'react'
import { StyleSheet } from 'react-native'
import { COLORS } from '../../misc/Constants'
import { LinearGradient } from 'expo-linear-gradient'

const Background = () => {
    return (
        <LinearGradient
            colors={[COLORS.accentLighter, COLORS.accent]}
            style={styles.background}
        />
    )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: "100%",
    },
})

export default Background
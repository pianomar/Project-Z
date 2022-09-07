import { useIsFocused } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { FIRESTORE, STRINGS } from '../../misc/Constants';
import { fetchUserFollowing, fetchUserPosts } from '../redux/actions';
import { useDispatch } from 'react-redux';

export default function Feed(userData) {
    const isFocused = useIsFocused()

    const currentFollowing = useSelector(state => state.user.following)
    const users = useSelector(state => state.users.users)
    const usersLoaded = useSelector(state => state.users.usersLoaded)

    const [posts, setPosts] = useState([])

    useEffect(() => {
        let posts = []

        if (usersLoaded == currentFollowing.length) {
            for (let i = 0; i < currentFollowing.length; i++) {
                const user = users.find(el => el.uid === currentFollowing[i])
                if (user != undefined) {
                    posts = [...posts, ...user.posts]
                }
            }
        }

        posts.sort(function (x, y) {
            return x.creation < y.creation
        })

        console.log["ss*******" +  posts[0] ]

        setPosts(posts)
        console.log(JSON.stringify(posts))
    }, [usersLoaded])

    return (
        <View style={styles.container}>
            <View style={styles.galleryContainer}>
                <FlatList
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <View>
                            {/* <Text>{item.user.name}</Text> */}
                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
        margin: 2
    }
})
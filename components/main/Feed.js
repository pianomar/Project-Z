import { useIsFocused } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { getAuth } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { FIRESTORE, STRINGS } from '../../misc/Constants';
import { fetchUserFollowing, fetchUserPosts } from '../redux/actions';
import { useDispatch } from 'react-redux';
import FeedItem from './FeedItem';

export default function Feed(userData) {
    const isFocused = useIsFocused()

    const currentFollowing = useSelector(state => state.user.following)
    const users = useSelector(state => state.users.users)
    const usersLoaded = useSelector(state => state.users.usersLoaded)

    const [posts, setPosts] = useState([])

    useEffect(() => {
        let posts = []

        if (currentFollowing.length >= usersLoaded) {
            for (let i = 0; i < currentFollowing.length; i++) {

                const user = users.find(el => el.uid === currentFollowing[i])
                if (user != undefined) {

                    let userPosts = user.posts
                    if (userPosts != undefined) {

                        userPosts.forEach(post => {
                            post.userName = user.name
                        });

                        posts = [...posts, ...userPosts]
                    }
                }
            }
        }

        posts.sort(function (x, y) {
            return x.creation < y.creation
        })

        setPosts(posts)
    }, [usersLoaded, isFocused])

    if (posts.length < 1) return (<View style={styles.noFollowers}><Text>{STRINGS.noFollowers}</Text></View>)

    return (
        <View style={styles.container}>
            <View style={styles.galleryContainer}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => <FeedItem item={item} />}
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
    noFollowers: {
        alignSelf: 'center', 
        flex: 1,
        justifyContent: 'center'
    },
})
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

export default function Profile(userData) {
  const isFocused = useIsFocused()

  const currentUserPosts = useSelector(state => state.user.posts)
  const currentUser = useSelector(state => state.user.currentUser)
  const currentFollowing = useSelector(state => state.user.following)
  const usersState = useSelector(state => state.users)
  const dispatch = useDispatch();
  
  const [userPosts, setUserPosts] = useState([])
  const [user, setUser] = useState(null)
  const [following, setFollowing] = useState(false)

  const db = getFirestore();

  const uid = userData.route.params.uid

  const isCurrentUser = uid === getAuth().currentUser.uid

  useEffect(() => {
    if (isCurrentUser) {
      setUserPosts(currentUserPosts)
      setUser(currentUser)
    } else {
      fetchEverything()
    }
    
    setFollowing(currentFollowing.indexOf(uid) > -1)
  }, [isFocused, currentFollowing])

  useEffect(() => {
    dispatch(fetchUserFollowing(usersState))
    dispatch(fetchUserPosts())
  }, [isFocused])

  const fetchEverything = async () => {
    const docSnap = await getDoc(doc(db, FIRESTORE.users, uid));

    if (docSnap.exists) {
      setUser(docSnap.data())
    }
    const userPostsRef = collection(db, FIRESTORE.posts, uid, FIRESTORE.userPosts)
    const querySnapshot = await getDocs(query(userPostsRef, orderBy(FIRESTORE.creationField)))
    const posts = querySnapshot.docs.map(doc => {
      const data = doc.data()
      const id = doc.id
      return { id, ...data }
    })

    setUserPosts(posts)
  }

  const onFollow = async () => {
    const postRef = doc(db, FIRESTORE.following, getAuth().currentUser.uid, FIRESTORE.userFollowing, uid);
    await setDoc(postRef, { creation: serverTimestamp() });
  }

  const onUnfollow = async () => {
    const postRef = doc(db, FIRESTORE.following, getAuth().currentUser.uid, FIRESTORE.userFollowing, uid);
    await deleteDoc(postRef);
  }

  if (user === null) return <AppLoading />

  return (
    <View style={styles.container}>
      <View>
        <Text>Hello, {user.name}</Text>
        <Text>{user.email}</Text>

        {!isCurrentUser &&
          <View>
            {following ? (
              <TouchableOpacity
                onPress={() => onUnfollow()}
              >
                <Text>{STRINGS.following}</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => onFollow()}
              >
                <Text>{STRINGS.follow}</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      </View>

      <View style={styles.galleryContainer}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => (
            <Image
              style={styles.image}
              source={{ uri: item.downloadURL }}
            />
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
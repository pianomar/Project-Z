import { useIsFocused, useNavigation } from '@react-navigation/native';
import AppLoading from 'expo-app-loading';
import { getAuth } from 'firebase/auth';
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { FlatList, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS, DIMENS, FIRESTORE, SCREENS, STRINGS } from '../../misc/Constants';
import { fetchUserFollowing, fetchUserPosts } from '../redux/actions';
import { useDispatch } from 'react-redux';
import commonStyles from '../../styles/commonStyles';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Profile(userData) {
  const isFocused = useIsFocused()

  const navigation = useNavigation()

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
      navigation.setOptions({
        headerRight: () => (
          <TouchableOpacity
            style={commonStyles.button}
            onPress={() => {
              navigation.navigate(SCREENS.profile, { uid: getAuth().currentUser.uid })
              setUserPosts(currentUserPosts)
              setUser(currentUser)
              navigation.setOptions({ headerRight: null });
            }}
          >
            <View>
              <Ionicons name='md-arrow-back-circle' options size={26} color={COLORS.active} />
            </View>
          </TouchableOpacity>
        ),
      });
    }

    setFollowing(currentFollowing.indexOf(uid) > -1)
  }, [currentFollowing, isFocused])

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
        <View style={styles.userInfoContainer}>
          <Text style={styles.nameText}>{user.name}</Text>
          <Text style={styles.emailText}>{user.email}</Text>

          {!isCurrentUser &&
            <View style={styles.followButton}>
              {following ? (
                <TouchableOpacity
                  onPress={() => onUnfollow()}
                >
                  <Text style={{ color: COLORS.activeLighter }}>{STRINGS.following}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => onFollow()}
                >
                  <Text style={{ color: COLORS.activeLighter }}>{STRINGS.follow}</Text>
                </TouchableOpacity>
              )}
            </View>
          }
        </View>

        {isCurrentUser &&
          <View style={styles.extraInfo}>
            <View style={{ alignSelf: 'flex-start', alignItems: 'center' }}>
              <Text style={styles.extraInfoText}>{STRINGS.following}</Text>
              <Text style={styles.nameText}>{currentFollowing.length}</Text>
            </View>

            <View style={{ alignSelf: 'flex-end', alignItems: 'center' }}>
              <Text style={styles.extraInfoText}>{STRINGS.posts}</Text>
              <Text style={styles.nameText}>{userPosts.length}</Text>
            </View>
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
  },
  userInfoContainer: {
    alignSelf: 'center',
    alignItems: 'center',
    margin: 20
  },
  emailText: {
    color: COLORS.inactive
  },
  nameText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  extraInfo: { width: '100%', alignItems: 'center', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly', marginBottom: 40, marginTop: 10 },
  extraInfoText: {
    color: COLORS.inactive,
    fontWeight: 'bold'
  },
  followButton: {
    backgroundColor: COLORS.accent,
    padding: 10,
    margin: 10,
    borderRadius: DIMENS.buttonRadius,

  }
})
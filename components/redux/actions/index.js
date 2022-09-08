import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot, orderBy, query } from "firebase/firestore"
import { FIRESTORE, STRINGS } from "../../../misc/Constants";
import { USER_STATE_CHANGE, USER_POST_STATE_CHANGE, USER_FOLLOWING_STATE_CHANGE, USERS_DATA_STATE_CHANGE, USERS_POSTS_STATE_CHANGE } from '../constants/index'
import { getAuth } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { users } from "../reducers/users";

export function fetchUser() {
    return (async dispatch => {
        const auth = getAuth();
        const db = getFirestore();
        const docSnap = await getDoc(doc(db, FIRESTORE.users, auth.currentUser.uid));

        if (docSnap.exists) {
            dispatch({ type: USER_STATE_CHANGE, currentUser: docSnap.data() })
        } else {
            alert(STRINGS.errorMessage)
        }
    })
}

export function fetchUserPosts() {
    return (async dispatch => {
        const auth = getAuth();
        const db = getFirestore();
        const userPostsRef = collection(db, FIRESTORE.posts, auth.currentUser.uid, FIRESTORE.userPosts)
        const querySnapshot = await getDocs(query(userPostsRef, orderBy(FIRESTORE.creationField)))
        const docs = querySnapshot.docs
        const posts = docs.map(doc => {
            const data = doc.data()
            const id = doc.id
            return { id, ...data }
        })


        dispatch({
            type: USER_POST_STATE_CHANGE, posts: posts
        })
    })
}

export function fetchUserFollowing(usersState) {
    return (async dispatch => {
        const auth = getAuth();
        const db = getFirestore();
        const userPostsRef = collection(db, FIRESTORE.following, auth.currentUser.uid, FIRESTORE.userFollowing)
        onSnapshot(userPostsRef, (snapshot) => {
            const following = snapshot.docs.map(doc =>
                doc.id
            )
            dispatch({ type: USER_FOLLOWING_STATE_CHANGE, following })

            for (let i = 0; i < following.length; i++) {
                dispatch(fetchUsersData(following[i], usersState));
            }
        });
    })
}

export function fetchUsersData(uid, usersState) {
    return (async (dispatch) => {
        const found = usersState.users.some(el => { 
            
            el.uid === uid 
        })

        

        if (!found) {
            const db = getFirestore();
            const docSnap = await getDoc(doc(db, FIRESTORE.users, uid));

            if (docSnap.exists) {
                const user = docSnap.data()
                user.uid = docSnap.id

                dispatch({ type: USERS_DATA_STATE_CHANGE, user });
                dispatch(fetchUsersFollowingPosts(user.uid, usersState));
            } else {
                alert(STRINGS.errorMessage)
            }
        }
    })
}

export function fetchUsersFollowingPosts(uid, usersState) {
    return (async dispatch => {

        const db = getFirestore();

        const userPostsRef = collection(db, FIRESTORE.posts, uid, FIRESTORE.userPosts)
        const querySnapshot = await getDocs(query(userPostsRef, orderBy(FIRESTORE.creationField)))
        const docs = querySnapshot.docs

        const uuid = querySnapshot.query._query.path.segments[1]
        const user = usersState.users.find(el => el.uid === uuid)

        const posts = docs.map(doc => {
            const data = doc.data()
            const id = doc.id
            return { id, ...data, user }
        })

        dispatch({
            type: USERS_POSTS_STATE_CHANGE, posts: posts, uid: uuid
        })
    })
}
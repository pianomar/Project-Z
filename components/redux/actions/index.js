import { collection, doc, getDoc, getDocs, getFirestore, orderBy, query } from "firebase/firestore"
import { FIRESTORE, STRINGS } from "../../../misc/Constants";
import { USER_STATE_CHANGE, USER_POST_STATE_CHANGE } from '../constants/index'
import { getAuth } from 'firebase/auth';

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

        if (posts.size != 0) {
            console.log(posts)
            dispatch({
                type: USER_POST_STATE_CHANGE, posts: posts
            })
        } else {
            alert("No posts yet")
        }
    })
}
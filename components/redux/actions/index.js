import { doc, getDoc, getFirestore } from "firebase/firestore"
import { STRINGS } from "../../../misc/Constants";
import USER_STATE_CHANGE from '../constants/index'

export function fetchUser() {
    return ((dispatch) => {
        const auth = getAuth();
        const db = getFirestore();
        const docSnap = getDoc(doc(db, "users", auth.currentUser.uid));
        
        if (docSnap.exists) {
            alert(docSnap.data())
            dispatch({ type: USER_STATE_CHANGE, currentUser: docSnap.data() })
        } else {
            console.log(STRINGS.errorMessage)
        }
    })
}
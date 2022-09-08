import React, { useState } from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import { STRINGS, DIMENS, COLORS, FIRESTORE } from '../../misc/Constants'
import Ionicons from '@expo/vector-icons/Ionicons';
require("firebase/firestore")
require("firebase/storage")
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { getAuth } from 'firebase/auth';
import { serverTimestamp, addDoc, getFirestore, collection, setDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import commonStyles from '../../styles/commonStyles';

export default function Save(props) {
    const navigation = useNavigation();

    const uri = props.route.params.image
    const [caption, setCaption] = useState("")
    const [progress, setProgress] = useState("")

    const uploadImage = async () => {

        const response = await fetch(uri)
        const blob = await response.blob()

        const imageName = `posts/${getAuth().currentUser.uid}/${Math.random().toString(36)}`
        const storage = getStorage();
        const storageRef = ref(storage, imageName);
        const uploadTask = uploadBytesResumable(storageRef, blob);

        uploadTask.on('state_changed', (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(STRINGS.progress + Math.floor(progress) + '%');

        }, (error) => { // error
            alert(STRINGS.errorMessage + " " + error)
        }, () => { // success
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                savePostData(downloadURL)
                alert(STRINGS.uploadSuccessful);
            });
        })
    }

    const savePostData = async (downloadURL) => {
        const postRef = collection(getFirestore(), FIRESTORE.posts, getAuth().currentUser.uid, FIRESTORE.userPosts);
        await addDoc(postRef, {
            downloadURL,
            caption,
            creation: serverTimestamp()
        });
        navigation.popToTop()
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: uri }} />
            <TextInput
                style={styles.captionText}
                placeholder={STRINGS.caption}
                onChangeText={(caption) =>
                    setCaption(caption)
                }
            />
            <View>
                <TouchableOpacity
                    style={[commonStyles.button, styles.uploadButton]}
                    onPress={() => uploadImage()}>
                    <Ionicons name='md-cloud-upload' options size={DIMENS.iconSize} color={COLORS.active} />
                </TouchableOpacity>
            </View>

            <Text>{progress}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    captionText: {
        height: DIMENS.buttonSize,
        borderBottomColor: COLORS.active,
        backgroundColor: COLORS.inactive,
        borderBottomWidth: 1,
        paddingLeft: 10,
        borderRadius: DIMENS.buttonRadius,
        width: "100%"
    },
    uploadButton: {
        width: 200
    }
})
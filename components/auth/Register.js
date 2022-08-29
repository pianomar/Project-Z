import React, { useState } from 'react'
import { View, TouchableOpacity, TextInput, Text } from 'react-native'
import { STRINGS } from '../../misc/Constants';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, getFirestore, setDoc } from "firebase/firestore";

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    function onSignup(params) {
        const auth = getAuth();
        const db = getFirestore();

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                setDoc(doc(db, "users", auth.currentUser.uid), {
                    name: name,
                    email: email
                });
            }).catch((error) => {
                alert(STRINGS.errorMessage)
                alert(error)
            })
    }

    return (
        <View>
            <TextInput
                placeholder={STRINGS.name}
                returnKeyType="next"
                value={name.value}
                onChangeText={text => setName(text)}
            />

            <TextInput
                placeholder={STRINGS.email}
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail(text)}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />
            <TextInput
                placeholder={STRINGS.password}
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />

            <TouchableOpacity
                onPress={() => onSignup()} >
                <Text>
                    {STRINGS.register}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Register
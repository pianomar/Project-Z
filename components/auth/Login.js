import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Text } from 'react-native';
import { STRINGS } from '../../misc/Constants';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    function onSignup(params) {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                alert(result)
            }).catch((error) => {
                alert(STRINGS.errorMessage)
            })
    }

    return (
        <View>
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

export default Login
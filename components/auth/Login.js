import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Text, StyleSheet } from 'react-native';
import { STRINGS } from '../../misc/Constants';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import Background from './Background';
import commonStyles from '../../styles/commonStyles';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    function onSignup(params) {
        const auth = getAuth();

        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                // Nothing
            }).catch((error) => {
                alert(STRINGS.errorMessage)
            })
    }

    return (
        <View style={{ flex: 1 }}>
            <Background />
            <View style={styles.container}>
                <TextInput
                    style={commonStyles.input}
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
                    style={[commonStyles.input, { marginTop: 20 }]}
                    placeholder={STRINGS.password}
                    returnKeyType="done"
                    value={password.value}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry={true}
                />

                <TouchableOpacity
                    style={[commonStyles.authButton, { alignSelf: 'center', marginTop: 20 }]}
                    onPress={() => onSignup()} >
                    <Text style={commonStyles.authButtonText}>
                        {STRINGS.login}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20
    },
})

export default Login
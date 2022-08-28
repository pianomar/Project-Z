import React from 'react'
import { View, TouchableOpacity, TextInput, useState, Text } from 'react-native'
import { STRINGS } from '../../misc/Constants';

const Register = () => {
    const [userName, setUsername] = useState();
    const [password, setPassword] = useState();
    const [name, setName] = useState();

    function onSignup(params) {
        
    }

    return (
        <View>
            <TextInput
                placeholder={STRINGS.name}
                onChangeText={() => setName({ name })} 
            />

            <TextInput
                placeholder={STRINGS.email}
                onChangeText={() => setUsername({ email })} 
            />

            <TextInput
                placeholder={STRINGS.password}
                secureTextEntry={true}
                onChangeText={() => setPassword({ password })} 
            />

            <TouchableOpacity
                onPress={STRINGS.register} >
                <Text>
                    {STRINGS.register}
                </Text>
            </TouchableOpacity>
        </View>
    )
}

export default Register
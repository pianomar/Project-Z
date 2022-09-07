import { useNavigation } from '@react-navigation/native'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { FlatList, Text, TextInput, View, TouchableOpacity } from 'react-native'
import { FIRESTORE, SCREENS } from '../../misc/Constants'

require('firebase/firestore')

export default function Search() {
    const navigation = useNavigation()

    const [users, setUsers] = useState([])

    const fetchUsers = async (searchQuery) => {
        if (searchQuery.trim() == "") return

        const db = getFirestore();
        const querySnapshot = await getDocs(query(collection(db, FIRESTORE.users)
            , where(FIRESTORE.nameField, ">=", searchQuery)))

        const docs = querySnapshot.docs
        const users = docs.map(doc => {
            const data = doc.data()
            const id = doc.id
            return { id, ...data }
        })

        setUsers(users)
    }

    return (
        <View>
            <TextInput onChangeText={(query) => fetchUsers(query)}></TextInput>

            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <View>
                        <TouchableOpacity onPress={() => {
                            navigation.navigate(SCREENS.profile, { uid: item.id })
                        }}>
                            <Text>{item.name}</Text>
                            <Text>{item.email}</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

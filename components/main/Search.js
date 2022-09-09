import { useNavigation } from '@react-navigation/native'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import React from 'react'
import { useState } from 'react'
import { FlatList, Text, TextInput, View, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS, DIMENS, FIRESTORE, SCREENS, STRINGS } from '../../misc/Constants'
import commonStyles from '../../styles/commonStyles'
import UserSearchItem from './UserSearchItem'

require('firebase/firestore')

export default function Search() {
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
        <View style={styles.container}>
            <TextInput
                style={[commonStyles.input, styles.searchText]}
                onChangeText={(query) => fetchUsers(query)}
                placeholder={STRINGS.search}></TextInput>

            {users.length > 0 &&
                <View>
                    <Text style={styles.bigTitle}>Usuarios:</Text>
                    <FlatList
                        style={styles.usersList}
                        numColumns={1}
                        horizontal={false}
                        data={users}
                        renderItem={({ item }) => (
                            <View>
                                <UserSearchItem item={item} />
                            </View>
                        )}
                    />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    usersList: {
        width: "100%"
    },
    searchText: {
        width: "100%",
        marginBottom: 40
    },
    bigTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.active,
        marginBottom: 20
    }
})
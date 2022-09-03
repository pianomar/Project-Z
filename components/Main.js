import React, { useEffect } from 'react';

import { fetchUser, fetchUserPosts } from './redux/actions/index'
import { useSelector, useDispatch } from 'react-redux';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeedScreen from './main/Feed';
import { COLORS, SCREENS } from '../misc/Constants';
import Ionicons from '@expo/vector-icons/Ionicons';
import { View } from 'react-native';
import AddScreen from './main/Add';
import ProfileScreen from './main/Profile';

const Tab = createBottomTabNavigator();

const Main = () => {
    const currentUser = useSelector(state => state.user.currentUser)

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser());
        dispatch(fetchUserPosts());
    }, []);

    return (
        <Tab.Navigator>
            <Tab.Screen
                name={SCREENS.feed}
                component={FeedScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Ionicons name='md-home' options size={26} color={focused ? COLORS.active : COLORS.inactive} />
                        </View>
                    ),
                    tabBarShowLabel: false
                }} />
                <Tab.Screen
                name={SCREENS.add}
                component={AddScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Ionicons name='md-add-circle-outline' options size={26} color={focused ? COLORS.active : COLORS.inactive} />
                        </View>
                    ),
                }} />
                <Tab.Screen
                name={SCREENS.profile}
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <View>
                            <Ionicons name='md-person' options size={26} color={focused ? COLORS.active : COLORS.inactive} />
                        </View>
                    )
                }} />
        </Tab.Navigator>
    )
}

export default Main

import React from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUser } from './redux/actions/index'

const Main = () => {
    fetchUser()
    return (
        <View><Text>Logged In</Text></View>
    )
}

const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUser }, dispatch)

export default connect(null, mapDispatchProps)(Main)
import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'
import AuthContext from '../../Services/Context'

const MyProfile = () => {

    const Context = useContext(AuthContext);

    // useEffect(() => {
    //     console.log('profileValue', Context.allData)
    // }, [])

    return (
        <View>
            <Text>MyProfile {Context.allData.userdata.username}</Text>
        </View>
    )
}

export default MyProfile
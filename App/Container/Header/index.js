import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'

const Header = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Image source={ImagePath.logo} style={styles.logo} />
                <View style={styles.textcontent}>
                    <Text style={styles.boldtext}>The Bengal Rowing Club</Text>
                    <Text style={styles.lighttext}>Established on August 25, 1929</Text>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
                <Image source={ImagePath.menu} style={styles.menu} />
            </TouchableOpacity>
        </View>
    )
}

export default Header
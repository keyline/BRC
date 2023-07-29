import { View, Text, TouchableOpacity, TextInput, Image } from 'react-native'
import React, { memo } from 'react'
import { ImagePath } from '../../Utils/ImagePath'
import { styles } from './styles'

const PasswordInput = ({ name, placeholder, onChangeText, value, passwordVisible, onChangeVisiblity, error }) => {
    return (
        <View style={styles.container}>
            {name && (
                <Text style={styles.headingtext}>{name} :</Text>
            )}
            <View style={styles.content}>
                <Image source={ImagePath.lock} style={styles.inputimg} />
                <TextInput
                    placeholder={placeholder}
                    secureTextEntry={passwordVisible}
                    style={[styles.input, { width: '80%' }]}
                    onChangeText={(e) => onChangeText(e)}
                    value={value}
                />
                <TouchableOpacity onPress={onChangeVisiblity}>
                    <Image source={passwordVisible ? ImagePath.eye_on : ImagePath.eye_off} style={styles.eyeicon} />
                </TouchableOpacity>
            </View>
            {error && (
                <Text style={styles.errName}>{error}</Text>
            )}
        </View>
    )
}

export default memo(PasswordInput)
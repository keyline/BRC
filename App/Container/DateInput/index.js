import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { memo } from 'react'
import { styles } from './styles'
import { ImagePath } from '../../Utils/ImagePath'
import { Colors } from '../../Utils/Colors'

const DateInput = ({ onPress, name, leftImage, placeholder, value, error }) => {
    return (
        <View style={styles.container}>
            {name && (
                <Text style={styles.headingtext}>{name} :</Text>
            )}
            <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={styles.inputcontent}>
                {leftImage && (
                    <Image source={ImagePath.leftImage} style={styles.inputimg} />
                )}
                <TextInput
                    placeholder={placeholder}
                    style={styles.input}
                    // onChangeText={(e) => onChangeText(e)}
                    editable={false}
                    value={value}
                    placeholderTextColor={Colors.border_grey}
                />
                <Image source={ImagePath.calendar} style={styles.eyeicon} />
            </TouchableOpacity>
            {error && (
                <Text style={styles.errName}>{error}</Text>
            )}
        </View>
    )
}

export default memo(DateInput)
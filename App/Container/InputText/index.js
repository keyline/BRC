import { View, Text, Image, TextInput } from 'react-native'
import React, { memo } from 'react'
import { styles } from './styles'
import { CommonStyle } from '../../Utils/CommonStyles'

const InputText = ({ name, leftIcon, value, placeholder,keyboardType, onChangeText, editable, multiline,error }) => {
    return (
        <View style={styles.container}>
            {name && (
                <Text style={styles.headingtext}>{name} :</Text>
            )}
            <View style={styles.inputcontent}>
                {leftIcon && (
                    <Image source={leftIcon} style={styles.inputimg} />
                )}
                <TextInput
                    value={value}
                    placeholder={placeholder ? placeholder : 'Enter ' + name}
                    onChangeText={(e) => onChangeText(e)}
                    style={styles.input}
                    editable={editable ? editable : true}
                    multiline={multiline ? multiline : false}
                    keyboardType={keyboardType ? keyboardType : 'default'}
                />
            </View>
            {error && (
                <Text style={styles.errName}>{error}</Text>
            )}
        </View>
    )
}

export default memo(InputText)
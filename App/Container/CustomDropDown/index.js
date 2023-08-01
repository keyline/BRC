import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import DropDownPicker from 'react-native-dropdown-picker'
import { Colors } from '../../Utils/Colors'
import { Font_Family } from '../../Utils/Fonts'

const CustomDropDown = ({ name, open, value, items, setOpen, setValue, setItems, placeholder, onChangeValue, dropDownDirection, error }) => {
    return (
        <View style={styles.container}>
            {name && (
                <Text style={styles.headingtext}>{name} :</Text>
            )}
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                onSelectItem={val => onChangeValue(val)}
                placeholder={placeholder ? placeholder : 'Select ' + name}
                placeholderStyle={styles.input1}
                labelStyle={styles.input1}
                style={styles.dropiker}
                dropDownDirection={dropDownDirection ? dropDownDirection : 'AUTO'}
                bottomOffset={100}
                dropDownContainerStyle={{
                    borderWidth: 0,
                    backgroundColor: Colors.lightGrey,
                    // position: 'absolute',  // 
                    // top: 5,
                    // bottom:5,
                    width: '80%',
                    zIndex: 99

                }}
                listItemLabelStyle={{
                    fontFamily: Font_Family.NunitoSans_SemiBold
                }}
                containerStyle={{
                    borderWidth: 0,
                    zIndex: 99
                }}
                listMode='SCROLLVIEW'
                scrollViewProps={{
                    nestedScrollEnabled: true,
                    // showsVerticalScrollIndicator:false
                }}
            />
            {error && (
                <Text style={styles.errName}>{error}</Text>
            )}
        </View>
    )
}

export default CustomDropDown
import { View, Text } from 'react-native'
import React from 'react'
import { styles } from './styles'
import DropDownPicker from 'react-native-dropdown-picker'
import { Colors } from '../../Utils/Colors'
import { Font_Family } from '../../Utils/Fonts'

const CustomDropDown = ({ name, open, value, items, setOpen, setValue, setItems, listMode, searchable, searchPlaceholder, placeholder, onChangeValue, dropDownDirection, error }) => {
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
                bottomOffset={200}
                searchable={searchable}
                searchTextInputStyle={{
                    fontFamily: Font_Family.NunitoSans_Regular,
                    color: Colors.text_color
                }}
                search
                searchContainerStyle={{
                    borderBottomColor: Colors.light_blue,
                    // borderColor:'red'
                }}
                searchPlaceholder={searchPlaceholder}
                dropDownContainerStyle={{
                    // flex:1,
                    borderWidth: 1,
                    backgroundColor: Colors.morelight_yellow,
                    borderColor: Colors.light_blue,
                    // position: 'relative',  // 
                    // top: 0,
                    // bottom:0,
                    width: '80%',
                    // marginBottom:15,
                    // paddingVertical:'10%'
                    zIndex: 999
                }}
                listItemLabelStyle={{
                    fontFamily: Font_Family.NunitoSans_SemiBold,
                    color: Colors.text_color
                }}
                containerStyle={{
                    borderWidth: 0,
                    // zIndex: 99
                }}
                listMode={listMode ? listMode : 'SCROLLVIEW'}
                // listMode='MODAL'
                flatListProps={{
                    nestedScrollEnabled: true,
                    initialNumToRender: 7
                }}
                scrollViewProps={{
                    nestedScrollEnabled: true,
                    // showsVerticalScrollIndicator:false
                }}
                modalProps={{
                    animationType: "fade",
                    // presentationStyle:'pageSheet'
                }}
                modalContentContainerStyle={{
                    backgroundColor: Colors.morelight_yellow,
                }}
            />
            {error && (
                <Text style={styles.errName}>{error}</Text>
            )}
        </View>
    )
}

export default CustomDropDown
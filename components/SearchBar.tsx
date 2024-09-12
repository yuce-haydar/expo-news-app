import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

type Props = {}

const SearchBar = (props: Props) => {
    return (
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Ionicons name='search-outline' style={{marginTop:5}}  size={20} color={Colors.black}></Ionicons>
                <TextInput placeholder='Haber Arayın' style={styles.SearchTxt} autoCapitalize='none'></TextInput>
            </View>
        </View>
    )
}

export default SearchBar
const styles = StyleSheet.create ({
    container: {
        marginHorizontal:20
    },
    searchBar: {
        position: 'absolute',
        backgroundColor: "#E4E4E4",
        paddingHorizontal:10,
        paddingVertical:12,
        borderRadius: 10,
        flexDirection: 'row',
        gap: 10,
        width: '100%',
   
    }
    ,
    SearchTxt: {
        fontSize: 16,
        color: Colors.black,
        fontWeight: '700',
    }

})
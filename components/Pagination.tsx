import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'
import Animated, { SharedValue } from 'react-native-reanimated'
import { Colors } from '@/constants/Colors'

type Props = {
    items: NewsDataType[],
    paginationIdex: number,
    scrollX: SharedValue<number>
}

const Pagination = ({ items, paginationIdex, scrollX }: Props) => {
    return (
        <View style={styles.container}>
            {
                items.map((_,index) => {
                    return (
                        <Animated.View style={[styles.dot,{backgroundColor: paginationIdex===index ? Colors.tint : Colors.darkGrey}]} key={index} />

                    );
                })
            }


        </View>

    )
}

export default Pagination

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: 30
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        margin: 5
    }

})
//     
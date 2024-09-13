import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useState } from 'react'
import { NewsDataType } from '@/types'
import SliderItem from '@/components/SliderItem'
import { Colors } from '@/constants/Colors'
import Animated, { useAnimatedRef, useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

type Props = {
    newsList: Array<NewsDataType>
}

const BreakingNews = ({ newsList }: Props) => {
    const  [data,setData]=useState(newsList);
    const  [paginationIndex,setPaginationIndex]=useState(0);
    const scrollx=useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const onScrollHandler=useAnimatedScrollHandler({
        onScroll: (e)=>{

            scrollx.value=e.contentOffset.x
        }
    })

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Güncel Haberler</Text>
            <View style={styles.slideWrapper}>
                <Animated.FlatList  onScroll={onScrollHandler} scrollEventThrottle={16} ref={ref} data={data} keyExtractor={(_, index) => `list_item${index}`} horizontal showsHorizontalScrollIndicator={false} pagingEnabled renderItem={({ item, index }) => (
                    <SliderItem sliderItem={item} scrollX={scrollx} index={index} />
                )} />
            </View>

        </View>
    )
}

export default BreakingNews

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        marginTop:50
    },
    title: {
        fontSize: 18,

        fontWeight: '700',

        
        marginBottom: 10,
        marginLeft: 20,
    },
    slideWrapper: {
        width: '100%',
        height: 200,
        justifyContent: "center"
    }
});
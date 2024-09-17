import { View, Text, StyleSheet, Dimensions, Image, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { NewsDataType } from '@/types'
import { SharedValue } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/reanimatedWrapper'
import { LinearGradient } from 'expo-linear-gradient'
import { Colors } from '@/constants/Colors'
import Animated, { Extrapolation, interpolate, useAnimatedStyle } from 'react-native-reanimated'
import { Link } from 'expo-router'

type Props = {
    sliderItem: NewsDataType,
    index: number,
    scrollX: SharedValue<number>
}

const { width } = Dimensions.get('screen')
const SliderItem = ({ sliderItem, index, scrollX }: Props) => {
    const rnStyle = useAnimatedStyle(() => {
        return {
            // get the previous and next item on the view of the active item, or scroll
            transform: [
                {
                    translateX: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [-width * 0.15, 0, width * 0.15],
                        Extrapolation.CLAMP
                    ),
                },
                {
                    scale: interpolate(
                        scrollX.value,
                        [(index - 1) * width, index * width, (index + 1) * width],
                        [0.9, 1, 0.9],
                        Extrapolation.CLAMP
                    ),
                },
            ],
        };
    });

    return (
        <Link href={`/news/${sliderItem.article_id}`} asChild>
            <TouchableOpacity>
                <Animated.View style={[styles.itemWrapper, rnStyle]} key={sliderItem.article_id}>
                    <Image source={{ uri: sliderItem.image_url }} style={styles.image} />
                    <LinearGradient colors={["transparent", 'rgba(0,0,0,0.8)']} style={styles.background}>
                        <View style={styles.sourceInfo}>

                            {
                                sliderItem.source_icon && (
                                    <Image source={{ uri: sliderItem.source_icon }} style={styles.sourceIcon}></Image>
                                )
                            }
                            <Text style={styles.sourceName}>
                                {sliderItem.source_name}
                            </Text>

                        </View>
                        <Text style={styles.title} numberOfLines={2}>
                            {sliderItem.title}
                        </Text>

                    </LinearGradient>
                </Animated.View>
        </TouchableOpacity>
        </Link>
    )
}

export default SliderItem

const styles = StyleSheet.create({
    itemWrapper: {
        position: 'relative',

        width: width,
        justifyContent: 'center',
        alignItems: 'center',
    }

    ,
    image: {
        width: width - 60,
        height: 180,
        borderRadius: 10,
    },
    title: {
        fontSize: 14,
        color: Colors.white,
        position: 'absolute',
        top: 120,
        paddingHorizontal: 20,

    }

    ,
    background: {
        position: 'absolute',
        width: width - 60,
        height: 180,
        borderRadius: 20,
        padding: 20,
    },
    sourceIcon: {
        width: 25, height: 25, borderRadius: 12.5,
    },
    sourceInfo: {
        position: 'absolute',
        flexDirection: 'row', top: 85, paddingHorizontal: 20,
        alignItems: 'center',
        gap: 10
    },
    sourceName: {
        color: Colors.white,
    },
});
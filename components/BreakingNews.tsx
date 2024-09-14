import { View, Text, StyleSheet, FlatList, ViewToken, useWindowDimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { NewsDataType } from "@/types";
import SliderItem from "@/components/SliderItem";
import { Colors } from "@/constants/Colors";
import Animated, {
    scrollTo,
    useAnimatedRef,
    useAnimatedScrollHandler,
    useDerivedValue,
    useSharedValue,
} from "react-native-reanimated";
import Pagination from "@/components/Pagination";

type Props = {
    newsList: Array<NewsDataType>;
};

const BreakingNews = ({ newsList }: Props) => {
    const [data, setData] = useState(newsList);
    const [paginationIndex, setPaginationIndex] = useState(0);
    const scrollx = useSharedValue(0);
    const ref = useAnimatedRef<Animated.FlatList<any>>();
    const [isAutoPlay, setIsAutoPlay] = useState(true);
    const interval = useRef<NodeJS.Timeout>();
    const offset = useSharedValue(0);
    const { width } = useWindowDimensions();

    const onScrollHandler = useAnimatedScrollHandler({
        onScroll: (e) => {
            scrollx.value = e.contentOffset.x;
        },
        onMomentumEnd: (e) => {
            offset.value = e.contentOffset.x;
        }
    });
    const onViewableItemsChanged = ({
        viewableItems,
    }: {
        viewableItems: ViewToken[];
    }) => {
        if (
            viewableItems[0]?.index !== undefined &&
            viewableItems[0]?.index !== null
        ) {
            // setCurrentIndex(viewableItems[0].index);
            setPaginationIndex(viewableItems[0].index % newsList.length);
            // console.log('paginationIndex ', viewableItems[0].index % newsList.length);
        }
    };
    useEffect(() => {
        if (isAutoPlay === true) {
            interval.current = setInterval(() => {
                offset.value = offset.value + width;
            }, 5000);
        } else {
            clearInterval(interval.current);
        }

        return () => {
            clearInterval(interval.current);
        };
    }, [isAutoPlay, offset, width]);

    useDerivedValue(() => {
        scrollTo(ref, offset.value, 0, true);
    });


    const viewabilityConfig = {
        itemVisiblePercentThreshold: 50,
    };

    const viewabilityConfigCallbackPairs = useRef([
        { viewabilityConfig, onViewableItemsChanged },
    ]);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Güncel Haberler</Text>
            <View style={styles.slideWrapper}>
                <Animated.FlatList
                    onScroll={onScrollHandler}
                    scrollEventThrottle={16}
                    ref={ref}
                    data={data}
                    keyExtractor={(_, index) => `list_item${index}`}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onEndReachedThreshold={0.5}
                    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
                    onEndReached={() => setData([...data, ...newsList])}
                    renderItem={({ item, index }) => (
                        <SliderItem sliderItem={item} scrollX={scrollx} index={index} />
                    )}
                    onScrollBeginDrag={() => {
                        setIsAutoPlay(false);
                    }}
                    onScrollEndDrag={() => {
                        setIsAutoPlay(true)
                    }}
                />
                <Pagination items={newsList} scrollX={scrollx} paginationIdex={paginationIndex} />
            </View>
        </View>
    );
};

export default BreakingNews;

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
        marginTop: 50,
    },
    title: {
        fontSize: 18,

        fontWeight: "700",

        marginBottom: 10,
        marginLeft: 20,
    },
    slideWrapper: {
        width: "100%",
        height: 200,
        justifyContent: "center",
    },
});

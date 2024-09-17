import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { NewsDataType } from "@/types";
import { Colors } from "@/constants/Colors";
import Loading from "./Loading";

type Props = {
    newsList: Array<NewsDataType>;
};

const NewsList = ({ newsList }: Props) => {
    return (
        <View style={styles.container}>
            { newsList.length == 0 ? (
                <Loading size={'large'} />
            ):(
                newsList.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <Image
                            source={{ uri: item.image_url }}
                            style={styles.itemImg} />
                        <View style={styles.itemInfo}>
                            <Text style={styles.itemCategory}>{item.category}</Text>
                            <Text style={styles.itemTitle}>{item.title}</Text>
    
                            <View style={styles.itemSourceInfo}>
                                <Image
                                    source={{ uri: item.source_icon }}
                                    style={styles.itemsourceImage}
                                ></Image>
                                <Text style={styles.itemsourceName}>{item.source_name}</Text>
                            </View>
                        </View>
                    </View>
                ))
            )}
        </View>
    );
};

export default NewsList;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,        
            marginBottom:50,
    },
    itemContainer: {
        flexDirection: "row",
        marginBottom: 20,
        alignItems: "center",
        flex: 1,
        gap: 10,
        width: "100%",
    },
    itemImg: { width: 90, height: 100, borderRadius: 20, marginRight: 10 },
    itemSourceInfo: { flexDirection: "row", alignItems: "center", gap: 8, },
    itemsourceImage: { width: 20, height: 20, borderRadius: 20 },
    itemsourceName: { fontSize: 10, fontWeight: "400", color: Colors.darkGrey, },
    itemTitle: { fontSize: 12, fontWeight: "600", color: Colors.black },
    itemCategory: { fontSize: 12, fontWeight: "400", color: Colors.darkGrey },
    itemInfo: {
        flex: 1,
        gap: 10,
        justifyContent: "space-between",
    },
});

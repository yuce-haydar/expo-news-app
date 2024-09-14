import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import React, { useRef, useState } from 'react';
import { Colors } from '@/constants/Colors';
import newsCategoryList from '@/constants/Categories';

type Props = {
    onCategoryChanged: (category: string) => void;
};

const Categories = ({ onCategoryChanged }: Props) => {
    const scrollRef = useRef<ScrollView>(null);
    const itemRef = useRef<TouchableOpacity[] | null[]>([]);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSelectCategory = (index: number) => {
        const selected = itemRef.current[index];
        setActiveIndex(index);

        // Seçilen kategori değişikliğini bildir
        onCategoryChanged(newsCategoryList[index].slug);

        // Seçilen öğeyi başa kaydır
        selected?.measureLayout(
            scrollRef.current,
            (x, y, width, height) => {
                scrollRef.current?.scrollTo({ x: x - 20, y: 0, animated: true });
            },
            (error) => console.error(error)
        );
    };

    return (
        <View>
            <Text style={styles.title}>Popüler Olan Kategoriler</Text>
            <ScrollView
                ref={scrollRef}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.itemWrapper}
            >
                {newsCategoryList.map((item, index) => (
                    <TouchableOpacity
                        ref={(el) => { itemRef.current[index] = el }}
                        key={index}
                        style={[
                            styles.item,
                            activeIndex === index && styles.itemActive
                        ]}
                        onPress={() => handleSelectCategory(index)}
                    >
                        <Text
                            style={[
                                styles.itemTxt,
                                activeIndex === index && styles.itemTxtActive
                            ]}
                        >
                            {item.title}
                        </Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
};

export default Categories;

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: '700',
        color: Colors.black,
        marginBottom: 10,
        marginLeft: 20,
    },
    itemWrapper: {
        gap: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginBottom: 10,
        height: 65,
    },
    item: {
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 16,
        color: Colors.darkGrey,
    },
    itemTxt: {
        fontSize: 16,
        color: Colors.darkGrey,
        letterSpacing: 0.5,
    },
    itemActive: {
        backgroundColor: Colors.tint,
        borderColor: Colors.tint,
    },
    itemTxtActive: {
        color: Colors.white,
        fontWeight: '600',
    },
});

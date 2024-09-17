import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { NewsDataType } from '@/types';
import axios from 'axios';
import { isLoaded, isLoading } from 'expo-font';
import Loading from '@/components/Loading';

type Props = {};

const NewsDetails = (props: Props) => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const [news, setNews] = useState<NewsDataType[]>([]);
    const [newsLoading, setNewsLoading] = useState<boolean>(true);
    useEffect(() => {
        getgNews();
    }, []);
    const getgNews = async () => {
        try {
            setNewsLoading(true);

            const URL = `https://newsdata.io/api/1/news?apikey=pub_53380aa0d898dbc9d469b754731fa5d4de06e&id=${id}`;
            const response = await axios.get(URL);
            console.log(response.data.results[0].id)
            if (response && response.data) {
                setNews(response.data.results);
                
            }
        } catch (error) {
            console.error("Error fetching breaking news:", error);
        } finally {
            setNewsLoading(false);
        }
    };
    return (
        <>
            {/* Stack.Screen Component with Correct Options Usage */}
            <Stack.Screen
                options={{
                    headerLeft: () => (
                        <TouchableOpacity onPress={() => router.back()} style={styles.iconButton}>
                            <Ionicons name="arrow-back" size={22} color="black" />
                        </TouchableOpacity>
                    ),
                    headerRight: () => (
                        <TouchableOpacity onPress={() => { }} style={styles.iconButton}>
                            <Ionicons name="heart-outline" size={22} color="black" />
                        </TouchableOpacity>
                    ),
                    title: '', // Set the title of the header, empty for no title
                }}
            />
            {
                newsLoading ? (
                    <Loading size={'large'}></Loading>
                ):(
            <View style={styles.container}>
                <Text style={styles.text}>{news[0].title}</Text>
                <Text style={styles.text}>{news[0].article_id}</Text>
                <Text style={styles.content}>{news[0].content}</Text>
            </View>

                )
            }
        </>
    );
};

export default NewsDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 18,
        color: '#333',
    },
    content:{

    },
    iconButton: {
        padding: 10,
    },
});

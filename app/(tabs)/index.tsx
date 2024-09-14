import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import axios from 'axios';
import { NewsDataType } from '@/types';
import BreakingNews from '@/components/BreakingNews';
import Categories from '@/components/Categories';

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();

  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getBreakingNews();
  }, []);

  const getBreakingNews = async () => {
    try {
      // const URL = `https://newsdata.io/api/1/news?apikey=${process.env.EXPO_PUBLIC_API_KEY}&country=tr&language=tr&removeduplicate=1&size=5`;
      const URL = `https://newsdata.io/api/1/news?apikey=pub_53380aa0d898dbc9d469b754731fa5d4de06e&country=tr&language=tr&category=business,crime,environment,sports,top&removeduplicate=1&size=5`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setBreakingNews(response.data.results);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error fetching breaking news:", error);
    }
  };
  const onCatChanged = (category: string) => {
    console.log(category);
  }


  return (
    <View style={[styles.container, { paddingTop: safeTop }]}>
      <Header />
      <SearchBar />
      {
        isLoading ? (
          <ActivityIndicator size={'large'} />
        ) : (
          <BreakingNews newsList={breakingNews}></BreakingNews>
        )
      }
      <Categories onCategoryChanged={onCatChanged}/>
      
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
});

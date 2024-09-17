import { ActivityIndicator, StyleSheet, Text, View, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import axios from 'axios';
import { NewsDataType } from '@/types';
import BreakingNews from '@/components/BreakingNews';
import Categories from '@/components/Categories';
import NewsList from '@/components/NewsList';
import Loading from '@/components/Loading';

type Props = {};

const Page = (props: Props) => {
  const { top: safeTop } = useSafeAreaInsets();

  const [breakingNews, setBreakingNews] = useState<NewsDataType[]>([]);
  const [news, setNews] = useState<NewsDataType[]>([]);
  const [breakingNewsLoading, setBreakingNewsLoading] = useState<boolean>(true);
  const [newsLoading, setNewsLoading] = useState<boolean>(true);

  useEffect(() => {
    getBreakingNews();
    getNews();
  }, []);

  const getBreakingNews = async () => {
    try {
      setBreakingNewsLoading(true);
      
      const URL = `https://newsdata.io/api/1/news?apikey=pub_53380aa0d898dbc9d469b754731fa5d4de06e&language=tr&category=business,crime,environment,sports,top&removeduplicate=1&size=5`;
      const response = await axios.get(URL);
      if (response && response.data) {
        setBreakingNews(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching breaking news:", error);
    } finally {
      setBreakingNewsLoading(false);
    }
  };

  const getNews = async (category: string = '') => {
    try {
      setNewsLoading(true);
      let URL = `https://newsdata.io/api/1/news?apikey=pub_53380aa0d898dbc9d469b754731fa5d4de06e&language=tr&removeduplicate=1&size=10`;
      if (category.length !== 0) {
        URL += `&category=${category}`;
      }
      const response = await axios.get(URL);
      if (response && response.data) {
        setNews(response.data.results);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setNewsLoading(false);
    }
  };

  const onCatChanged = (category: string) => {
    console.log('Selected category:', category);
    setNews([]); // Mevcut haberleri temizle
    getNews(category);
  };

  return (
    <ScrollView
      style={[styles.container, { paddingTop: safeTop }]}
      contentContainerStyle={styles.contentContainer}
    >
      <Header />
      <SearchBar />
      {breakingNewsLoading ? (
        <Loading size={'large'} />
      ) : (
        <BreakingNews newsList={breakingNews} />
      )}
      <Categories onCategoryChanged={onCatChanged} />
      {newsLoading ? (
        <Loading size={'large'} />
      ) : (
        <NewsList newsList={news} />
      )}
    </ScrollView>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    // İçerik düzeni buraya uygulanabilir
  },
});

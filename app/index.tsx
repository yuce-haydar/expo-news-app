import { ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useRouter } from "expo-router";
import { Colors } from "@/constants/Colors";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

const Page = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar  />
      <ImageBackground source={require("@/assets/images/getting-started.jpg")} style={{flex: 1,}} resizeMode="cover"/>
      <View style={styles.wrapper}>
        
      <Animated.Text entering={FadeInRight.delay(300).duration(500)} style={styles.title}>Welcome Page</Animated.Text>
      <Animated.Text entering={FadeInRight.delay(700).duration(500)}  style={styles.description}>Yeni Haberleri Okuyun ve Kendinize Göre Düzenleyin</Animated.Text>
      <Animated.View entering={FadeInDown.delay(1200).duration(500)}>
      <TouchableOpacity style={styles.btn} onPress={() => router.replace("/(tabs)")}>
        <Text style={styles.btnTxt}>Go to Home Screen</Text>
      </TouchableOpacity>
      </Animated.View>
      </View>
      
      <ImageBackground/>
      
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  wrapper: {
    flex: 1,
    justifyContent :'flex-end'  ,
    paddingBottom: 50,  
    alignItems: 'center',
    paddingHorizontal: 30,
    gap: 20,
    backgroundColor: 'rgba(0,0,0,0.5)'
    },
    title: {
      color: Colors.white,
      fontSize: 24,
      fontWeight: '600',
      letterSpacing:1.5,
      lineHeight:36,
      textAlign: 'center',
    },
    description: {
      color: Colors.white,
      fontSize: 16,
      fontWeight: '500',
      letterSpacing:1.2,
      lineHeight:22,
      textAlign: 'center',
    },
    btn:{
      backgroundColor: Colors.tint,
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginTop: 20,
    },
    btnTxt:{
      color: Colors.white,
      fontSize: 16,
      fontWeight: '600',
      letterSpacing:1.2,
      lineHeight:22,
      textAlign: 'center',
    }
});

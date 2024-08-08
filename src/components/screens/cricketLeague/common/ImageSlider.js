import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Banner2,Banner1, BannerH2, BannerH3, BannerH1 } from '../../../../assets';
import { styles } from '../crickLeagueStyles/ImageSlider.style';







const ImageSlider = ({navigation, bannerData}) => {
  let images=[BannerH1, BannerH2, BannerH3];
  const [activeDotIndex, setActiveDotIndex] = useState(0);






  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      console.log("Home Page is Loaded");
    });
    return () => unsubscribe();
  }, ([navigation]));




  const renderImage = (image, index) => {
    return (
      <View style={styles.slide} key={index}>
        <Image resizeMode="contain" style={styles.image} source={{uri : image}} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Swiper
          loop
          autoplay = {true}
          showsPagination={false}
          onIndexChanged={index => {
            setActiveDotIndex(index)
          }}
        >
          {bannerData.length >0 ? bannerData.map((image, index) => 
            renderImage(image, index)) 
          : ""}
        </Swiper>
      </View>
      <View style={styles.paginationContainer}>
        {bannerData.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activeDotIndex && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageSlider;

import { BannerImageBG, TBC } from '../../../assets';
import UserStore from '../../stores/UserStore';
import { styles } from './crickLeagueStyles/CricketLeague.style';
import { View, Text, ScrollView, StatusBar, ImageBackground, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Functions from '../Functions';




const MatchBanner = ({selectedUserMatch}) => {
    // let selectedUserMatch = UserStore.getselectedMatch();
    // console.log("selectedUserMatch Banner : ", selectedUserMatch)




  





  
  return (
    <View style={styles.slide}>
    <ImageBackground source={BannerImageBG}
      style={[styles.image]}
      resizeMode="contain"
      imageStyle={styles.image}>
      <Text style={[styles.headingText, styles.ennum, styles.tcnr, {marginTop : 15}]}>
        {selectedUserMatch?.title}
      </Text>
      
      <View style={[styles.mnmain, {marginTop : 15}]}>
        <View>
          {(selectedUserMatch?.team1Logo == "") || (selectedUserMatch?.team1Logo == "https://cdn.sportmonks.com") ? 
              <Image style={[styles.image, styles.mnimg,{marginTop : 5}]} source={TBC}/>
              :
              <Image
                  style={[styles.image, styles.mnimg]}
                  source={{
                    // uri: `https://www.cricbuzz.com/a/img/v1/40x40/i1/c${selectedUserMatch?.team1Logo}/player_face.jpg`,
                    uri: `https://cdn.sportmonks.com/images/cricket/teams/${selectedUserMatch?.team1Logo}`,
                  }}
            />
          }

          <Text
            style={[styles.headingText, styles.ennum, styles.lfttm]}>
            {selectedUserMatch?.team1Name}
          </Text>
        </View>
        <View>
          <Text
            style={[
              styles.headingText,
              styles.ennum,
              styles.tcnr,
              styles.tmtxy,
              {backgroundColor : 'black',borderRadius:14,padding:2,paddingLeft:10,paddingRight:10,fontFamily: 'Poppins-SemiBold'}
            ]}>
            {Functions.getInstance().getMatchTimeonly(selectedUserMatch?.startTime)}
          </Text>
          <Text
            style={[
              styles.headingText,
              styles.ennum,
              styles.tcnr,
              styles.tmtxy,
              {fontFamily: 'Roboto-Bold',}
            ]}>
            {Functions.getInstance().getMatchDateonly(selectedUserMatch?.startTime)}
          </Text>
        </View>
        <View>

        {(selectedUserMatch?.team2Logo == "") || (selectedUserMatch?.team2Logo == "https://cdn.sportmonks.com") ? 
                  <Image style={[styles.image, styles.mnimg,{marginTop : 5}]} source={TBC}/>
              :

              <Image
                style={[styles.image, styles.mnimg]}
                source={{
                  // uri: `https://www.cricbuzz.com/a/img/v1/40x40/i1/c${selectedUserMatch?.team2Logo}/player_face.jpg`,
                  uri: `https://cdn.sportmonks.com/images/cricket/teams/${selectedUserMatch?.team2Logo}`,
                }}
              />
          }
          <Text
            style={[styles.headingText, styles.ennum, styles.rhtitm]}>
            {selectedUserMatch?.team2Name}
          </Text>
        </View>
        
      </View>
    </ImageBackground>
  </View>
  );
};

export default MatchBanner;

import React, {useEffect, useRef, useState} from 'react';
import {Image, Text, TouchableOpacity, View, Animated, Easing, ActivityIndicator} from 'react-native';
import {BorderLine2, CorrectIcon, PlusIcon, TickIcon} from '../../../assets';
import Modal from 'react-native-modal';
// import { styles } from '../draft/Draft.styles';
import { styles } from './BothTeamSelection.styles';
import { ScrollView } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import { graybg } from '../../../style';




const LoadingPopup = ({isVisible, closePopup, navigation, teamA, teamB, teamABench, teamBBench,isOpponent, userInfo}) => {
    let rotateValueHolder = new Animated.Value(0);
  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => startImageRotateFunction());
  };


  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });






  const renderTeamAItem = ({ item, index }) => (
    <View style={[styles.tmplyrlft, 
        (item.isSel == "1"  && isOpponent && item.selBy == userInfo?.userId) ? styles.borderTopOrangeWidth 
        : 
        (item.isSel == "1"  && isOpponent == false && item.selBy == userInfo?.userId) ? styles.borderTopBlueWidth 
        :
        (item.isSel == "1"  && isOpponent && item.selBy != userInfo?.userId) ? styles.borderTopBlueWidth 
        :
        (item.isSel == "1"  && isOpponent == false && item.selBy != userInfo?.userId) ? styles.borderTopOrangeWidth
        :
        "grey" 
    ]}>
        <View style={styles.plyrlft}>
            <View style={[styles.plyrprfl, styles.plyrlftprfl]}>
            {item.imageId == "" ? <Image style={styles.teamsImageStyle} source={require('../../../assets/images/dummy.png')}/>
                :
                <Image style={styles.teamsImageStyle} source={{ uri: `https://cdn.sportmonks.com/images/cricket/players/${item.imageId}` }} />
            }
            </View>
            <View style={{ marginTop: 5 }}>
                <Text style={[styles.ortxt, styles.plyrtm, styles.plyrsd]}>{item.teamName}</Text>
            </View>
        </View>
        <View style={[styles.dotp, styles.dotp2]}>
            <Image style={styles.dotimg} source={BorderLine2} />
        </View>
        <View>
            <Text style={[styles.teamnm, styles.wnrtxt, styles.tmname, styles.plyrname]}>{item.name}</Text>
            <Text style={[styles.teamnm, styles.plyrruns]}>Avg : {item.avg}</Text>
            <Text style={[styles.ortxt, styles.plyrruns]}>HS : {item.hs}</Text>
        </View>
       
        <TouchableOpacity
            style={[styles.adplyr, 
                {backgroundColor: 
                    (item.isSel == "1"  && isOpponent && item.selBy == userInfo?.userId) ? "orange" 
                    : 
                    (item.isSel == "1"  && isOpponent == false && item.selBy == userInfo?.userId) ? "#246afe" 
                    :
                    (item.isSel == "1"  && isOpponent && item.selBy != userInfo?.userId) ? "#246afe" 
                    :
                    (item.isSel == "1"  && isOpponent == false && item.selBy != userInfo?.userId) ? "orange" 
                    :
                   
                    "grey" }]}
            disabled={true}
            onPress={() => {}}
        >
            {item.isSel == "1" ? (
                <Image style={{width:8,height:8}} source={TickIcon}/>
            ) : (
                <Image style={styles.adplusimg} source={PlusIcon} />
            )}
        </TouchableOpacity>

    </View>
);

const renderTeamBItem = ({ item, index }) => (
<View style={[styles.tmplyrlft,
        (item.isSel == "1"  && isOpponent && item.selBy == userInfo?.userId) ? styles.borderTopOrangeWidth 
        : 
        (item.isSel == "1"  && isOpponent == false && item.selBy == userInfo?.userId) ? styles.borderTopBlueWidth 
        :
        (item.isSel == "1"  && isOpponent && item.selBy != userInfo?.userId) ? styles.borderTopBlueWidth 
        :
        (item.isSel == "1"  && isOpponent == false && item.selBy != userInfo?.userId) ? styles.borderTopOrangeWidth
        :
        "grey" 
    ]}>
    <View style={styles.plyrlft}>
        <View style={[styles.plyrprfl, styles.plyrlftprfl]}>
        {item.imageId == "" ? <Image style={styles.teamsImageStyle} source={require('../../../assets/images/dummy.png')}/>
            :
            <Image style={styles.teamsImageStyle} source={{ uri: `https://cdn.sportmonks.com/images/cricket/players/${item.imageId}` }} />
        }
        </View>
        <View style={{ marginTop: 5 }}>
            <Text style={[styles.ortxt, styles.plyrtm, styles.plyrsd]}>{item.teamName}</Text>
        </View></View>
    <View style={[styles.dotp, styles.dotp2]}>
        <Image style={styles.dotimg} source={BorderLine2} />
    </View>
    <View>
        <Text style={[styles.teamnm, styles.wnrtxt, styles.tmname, styles.plyrname]}>{item.name}</Text>
        <Text style={[styles.teamnm, styles.plyrruns]}>Avg : {item.avg}</Text>
        <Text style={[styles.ortxt, styles.plyrruns]}>HS : {item.hs}</Text>
    </View>

    {/* {(item.isSel == "1" || (currentSystemTime > (item.endTime))) && item.endTime != "" ? */}
            <TouchableOpacity style={[styles.adplyr,
                        {backgroundColor: 
                            (item.isSel == "1"  && isOpponent && item.selBy == userInfo?.userId) ? "orange" 
                            : 
                            (item.isSel == "1"  && isOpponent == false && item.selBy == userInfo?.userId) ? "#246afe" 
                            :
                            (item.isSel == "1"  && isOpponent && item.selBy != userInfo?.userId) ? "#246afe" 
                            :
                            (item.isSel == "1"  && isOpponent == false && item.selBy != userInfo?.userId) ? "orange" 
                            :
                            "grey" }]}                        
                onPress={() => {}}
                disabled={true}
            >
                {item.isSel == "1" ? (
                    <Image style={{width:8,height:8}} source={TickIcon} />
                ) : (
                    <Image style={styles.adplusimg} source={PlusIcon} />
                )}
            </TouchableOpacity>

</View>
);






  return (
      <Modal isVisible={isVisible} style={{marginTop: 100}}>
        <View style={{paddingHorizontal: 0,paddingVertical: 0,marginBottom: 30,width:'100%'}}>
          <ScrollView style={[styles.scrollView]}>
          <Text style={[styles.headingText, styles.ennum,{textAlign : 'center',fontSize:14}]}>Please wait while your opponent selects a player</Text>
          <View style={[styles.playerContainer,{marginTop : 10}]}>
              <View style={styles.playerContentBox}>
                  <FlatList
                      data={teamA}
                      renderItem={renderTeamAItem}
                      keyExtractor={(item, index) => index.toString()}
                  />
              </View>
              <View style={styles.playerContentBox}>
                  <FlatList
                      data={teamB}
                      renderItem={renderTeamBItem}
                      keyExtractor={(item, index) => index.toString()}
                  />
              </View>
          </View>
          <Text style={[styles.headingText, styles.ennum,{textAlign : 'center'}]}>Bench</Text>
          <View style={styles.playerContainer}>
              <View style={styles.playerContentBox}>
                  <FlatList
                      data={teamABench}
                      renderItem={renderTeamAItem}
                      keyExtractor={(item, index) => index.toString()}
                      ListFooterComponent={<View style={{ paddingBottom: 50 }} />}
                  />
              </View>
              <View style={styles.playerContentBox}>
                  <FlatList
                      data={teamBBench}
                      renderItem={renderTeamBItem}
                      keyExtractor={(item, index) => index.toString()}
                      ListFooterComponent={<View style={{ paddingBottom: 50 }} />}
                  />
              </View>
          </View>
          </ScrollView>
          <View style={{width: "100%", backgroundColor: graybg, borderRadius: 14, paddingHorizontal: 6, paddingVertical: 5,marginLeft: 'auto',marginRight: 'auto', borderTopColor: "red"}}>
              <View style={styles.crtimg}>
                  <ActivityIndicator size="large" color="#279bff" />
              </View>
              <Text style={styles.sucstxt}>Waiting for opponent's pick</Text>
            </View>
        </View>
        






      </Modal>
  );
};

export default LoadingPopup;

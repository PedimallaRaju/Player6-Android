import React, { FC, useEffect, useRef, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View, Pressable } from 'react-native';
import { CapColor, CapShadow, CloseIcon, FireBall, TBC } from '../../../../assets';
// import { displayMatchDateTime } from '../../../../utils';
import { styles } from '../crickLeagueStyles/MatchList.style';
import { secondary } from '../../../../style';
import Functions from '../../Functions';
import { useNavigation } from '@react-navigation/native';
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage";


const MatchesList = ({ title, showMore, data, extraData,onPressMatch }) => {
  const [t1, setT1] = useState("View All");
  const [ucMatches, setucMatches] = useState(false);
  const intervalRef = useRef(null);
  const [fdata, setFData] = useState([]);

  const viewAllMatches = (type) =>{
    if(type == "View All"){
      Functions.getInstance().fireAdjustEvent("7w75kk");
      Functions.getInstance().fireFirebaseEvent("HomeViewAll");
      let properties = new MoEProperties();
      properties.addAttribute("clicked", true);
      ReactMoE.trackEvent("View all", properties);
      setT1("View Less");
      setucMatches(true);
    }
    else{
      setucMatches(false);
      setT1("View All");
    }
  }



  useEffect (()=>{
    if(showMore == false){
      setT1("View Less");
      setucMatches(true);
    }
    else{
      setucMatches(false);
      setT1("View All");
    }
  },[])


 

 



  const renderContestContent = (item) => {
    return (
      <TouchableOpacity onPress={() => onPressMatch(item)}>
        <View style={styles.mtchcardupper}>
          <View style={styles.mtchcardhdr}>
            <View style={styles.mtchcardqlfr}>
              <Text style={styles.teamtxt}>{item.item.title}</Text>
              <View style={styles.teamcap}>
                {item.item.hasPlayers == "1" ? 
                  <Image style={styles.tmimg} source={CapColor} />
                :
                  <Image style={styles.tmimg} source={CapShadow} />
                }
              </View>
            </View>
          </View>
          <View style={styles.mtchcard}>
            <View style={styles.team}>
              <View style={[styles.teamvw,{backgroundColor : 'white'}]}>
                {/* <Image style={styles.tmimg} source={{ uri: `https://www.cricbuzz.com/a/img/v1/40x40/i1/c${item.item.team1Logo}/player_face.jpg` }} /> */}
                {(item.item.team1Logo == "") || (item.item.team1Logo == "https://cdn.sportmonks.com") ? 
                  <Image style={[styles.tmimg, {marginTop : 5}]} source={TBC}/>
                  :
                  <Image style={styles.tmimg} source={{ uri: `https://cdn.sportmonks.com/images/cricket/teams/${item.item.team1Logo}` }} />
                }
              </View>
              <Text style={styles.teamnm}>{item.item.team1Name}</Text>
            </View>
            <View style={styles.mtchtm}>
              {/* <Text style={[styles.teamnm, styles.mtchab]}>{item.item.title}</Text> */}
              
              { Functions.getInstance().getHours(item.item.startTime) == "Yes" ?  
                  <Text style={[styles.teamnm, styles.vs,{width : 100, marginBottom : 17,marginTop : 10}]}>{item.item.timer}</Text>
                :
                <Text style={[styles.teamnm, styles.vs, {width : 60, marginBottom : 17,marginTop : 10}]}>VS</Text>
              }
              <Text style={[styles.teamnm, styles.mtchab, styles.tmng,]}>
                  {Functions.getInstance().displayMatchDateTime(item.item.startTime)}
                </Text>

            </View>
            <View style={styles.team}>
              <View style={[styles.teamvw,{backgroundColor : 'white'}]}>
                {/* <Image style={styles.tmimg} source={{ uri: `https://www.cricbuzz.com/a/img/v1/40x40/i1/c${item.item.team2Logo}/player_face.jpg` }} /> */}
                {(item.item.team1Logo == "") || (item.item.team1Logo == "https://cdn.sportmonks.com") ? 
                    <Image style={[styles.tmimg, {marginTop : 5}]} source={TBC}/>
                    :
                    <Image style={styles.tmimg} source={{ uri: `https://cdn.sportmonks.com/images/cricket/teams/${item.item.team2Logo}` }} />
                }
              </View>
              <Text style={styles.teamnm}>{item.item.team2Name}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }



  const renderUcMatch = (item) => {
    return (
      <TouchableOpacity onPress={() => {item.item.hasPlayers == "1" ? onPressMatch(item) : console.log("squad not released")}}>
        <View style={styles.mtchcardupper}>
          <View style={styles.mtchcardhdr}>
              <View style={styles.mtchcardqlfr}>
                <Text style={styles.teamtxt}>{item.item.title}</Text>
                <View style={styles.teamcap}>
                  {item.item.hasPlayers == "1" ? 
                    <Image style={styles.tmimg} source={CapColor} />
                  :
                    <Image style={styles.tmimg} source={CapShadow} />
                  }
                </View>
              </View>
            </View>
        <View style={styles.mtchcard}>
          <View style={styles.team}>
            <View style={[styles.teamvw,{backgroundColor : 'white'}]}>
              {(item.item.team1Logo == "") || (item.item.team1Logo == "https://cdn.sportmonks.com") ? 
                 <Image style={[styles.tmimg, {marginTop : 5}]} source={TBC}/>
                :
                <Image style={styles.tmimg} source={{ uri: `https://cdn.sportmonks.com/images/cricket/teams/${item.item.team1Logo}` }} />
              }
            
              {/* <Image style={styles.tmimg} source={{ uri: `https://www.cricbuzz.com/a/img/v1/40x40/i1/c${item.item.team1Logo}/player_face.jpg` }} /> */}
            </View>
            <Text style={[styles.teamnm]}>{item.item.team1Name}</Text>
          </View>
          <View style={styles.mtchtm}>
            {/* <Text style={[styles.teamnm, styles.mtchab]}>{item.item.title}</Text> */}
            <Text style={[styles.teamnm, styles.vs, {width : 60, marginBottom : 17,marginTop : 10}]}>VS</Text>
            <Text style={[styles.teamnm, styles.mtchab, styles.tmng]}>
              {Functions.getInstance().displayMatchDateTime(item.item.startTime)}
            </Text>
          </View>
          <View style={styles.team}>
            <View style={[styles.teamvw,{backgroundColor : 'white'}]}>
            
            {(item.item.team1Logo == "") || (item.item.team1Logo == "https://cdn.sportmonks.com") ? 
                 <Image style={[styles.tmimg, {marginTop : 5}]} source={TBC}/>
                :
                <Image style={styles.tmimg} source={{ uri: `https://cdn.sportmonks.com/images/cricket/teams/${item.item.team2Logo}` }} />
              }

              {/* <Image style={styles.tmimg} source={{ uri: `https://www.cricbuzz.com/a/img/v1/40x40/i1/c${item.item.team2Logo}/player_face.jpg` }} /> */}
            </View>
            <Text style={styles.teamnm}>{item.item.team2Name}</Text>
          </View>
        </View>
        </View>

      </TouchableOpacity>
    )
  }








  return (
    <View >
      {showMore ? 
      <View style={styles.rnghd}>
        
        <View style={styles.rnghdlft}>
          <Image style={styles.frbl} source={FireBall} />
          <Text style={[styles.hdtxt, styles.hdtxte]}>{title}</Text>
          <View style={styles.viewAllContainer}>
            <TouchableOpacity onPress={()=>viewAllMatches(t1)}>
              <Text style={[styles.teamnm, styles.mtchab, { color: secondary }]}>{t1}</Text>
            </TouchableOpacity>
          </View> 
        </View>
         
      </View>
      : null}

    {showMore ?
          <FlatList
            data={data}
            keyExtractor={(item,index) => index}
            renderItem={renderContestContent}
            contentContainerStyle={styles.contentContainer}
            ListFooterComponent={<View style={{ paddingBottom: ucMatches ? 5 : 25 }} />}
          />
    : null }

    {ucMatches ?
        extraData && extraData.length > 0 ? 
        <View>
          <View style={[styles.rnghd]}>
          <View style={styles.rnghdlft}>
            <Image style={styles.frbl} source={FireBall} />
            <Text style={[styles.hdtxt, styles.hdtxte]}>Subsequent Matches</Text>
          </View>
          </View>
        <View style={{marginBottom : 30}}>
        <FlatList
          data={extraData}
          keyExtractor={(item,index) => index}
          renderItem={renderUcMatch}
          contentContainerStyle={styles.contentContainer}
        />
        </View>
      </View>
      : ""
    : ""}
    </View>
  );
};

export default MatchesList;
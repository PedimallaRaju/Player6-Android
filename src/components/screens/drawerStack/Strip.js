import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, TouchableOpacity, View } from 'react-native';
import {DrawerIcon,HIcons,HelpIcon,Notification,dummyImage,} from '../../../assets';
import { DrawerActions } from '@react-navigation/native';
import { styles } from './Route.styles';
import UserStore from '../../stores/UserStore';
import { inject, observer } from 'mobx-react';
import WithProgress from '../LoadingOverlay/WithProgress';
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust';
import Functions from '../Functions';
import ReactMoE,{
  MoEProperties,
} from "react-native-moengage"; 



let userPF;
const Strip = ({props}) => {
    if(UserStore){
        const profile = UserStore.getuserPF();
        if(profile){
          userPF = profile?.replace(/['"]+/g, '');
        } 
      }
  return (
    <View style={styles.scrnbg}>
        <View style={styles.header}>
          <View style={styles.hdlist}>
            <View style={styles.hdleft}>
              <TouchableOpacity
                onPress={() =>{
                  let properties = new MoEProperties();
                  properties.addAttribute("click_menu", true);
                  ReactMoE.trackEvent("click_menu", properties);
                  props.navigation.dispatch(DrawerActions.openDrawer())
                }
                  
                }>
                <View style={styles.menu}>
                  <Image style={styles.menui} source={DrawerIcon} />
                </View>
              </TouchableOpacity>
              <View style={styles.user}>
                <TouchableOpacity
                  onPress={() => {
                      Functions.getInstance().fireAdjustEvent("dgx9mb");
                      Functions.getInstance().fireFirebaseEvent("HomeProfileIcon");
                      props.navigation.navigate('EditProfile');
                    }
                  }
                  >
                  {/* <Image
                    style={styles.userp}
                    source = { userPF ? {uri : userPF} :  require('../../../assets/images/dummy.png')}
                  /> */}



                  {userPF == "https://s3.ap-south-1.amazonaws.com/player6sports/pl6Uplods/" ? 
                    <Image style={styles.userp} source={require('../../../assets/images/dummy.png')}/>
                    :
                    <Image style={styles.userp} source={ {uri : userPF}}/>
                  }




                  <View style={styles.adot} />
                </TouchableOpacity>
              </View>
            </View>

            <Pressable onPress={()=>{
                Functions.getInstance().fireAdjustEvent("7ujj31");
                Functions.getInstance().fireFirebaseEvent("HomeLogo");
                let properties = new MoEProperties();
                properties.addAttribute("Home Page PLAYER6", true);
                ReactMoE.trackEvent("Homepage Player6", properties);
                props.navigation.navigate('CricketLeague')
              }}>
              <View style={[styles.hdmdl,{marginRight : 50}]}>
                <Image style={styles.hlogo} source={HIcons} />
              </View>
            </Pressable>

            <View style={[styles.hdleft]}>
              {/* <View style={[styles.menu]}>
                <Image style={[styles.menui, styles.helpi]} source={HelpIcon} />
              </View>
              <View style={[styles.menu, styles.ntfn]}>
                <Image
                  style={[styles.menui, styles.ntfni]}
                  source={Notification}
                />
              </View> */}
            </View>
          </View>
        </View>
      </View>
  )
}

export default WithProgress(inject('UserStore')(observer(Strip)))

import React from 'react';
import { Image, Pressable, TouchableOpacity, View } from 'react-native';
import { BackIcon, HIcons, Notification } from '../../../assets';
import { styles } from './Route.styles';
import { Adjust, AdjustEvent, AdjustConfig } from 'react-native-adjust';
import Functions from '../Functions';


export const AppBackHeader = (props) => {
  return {
    header: () => (
      <View style={styles.scrnbg}>
        <View style={styles.header}>
          <View style={styles.hdlist}>
            <View style={styles.hdleft}>
              <TouchableOpacity
                onPress={() =>{
                  Functions.getInstance().fireAdjustEvent("l3wxpr");
                  Functions.getInstance().fireFirebaseEvent("HeaderBackButton");
                  const routes = props.navigation.getState()?.routes;
                  console.log(routes);
                  if((routes?.length > 1) && (routes[1].name == 'InfoDetails')){
                    props.navigation.goBack();
                  }
                  else if((routes[0].name == 'BettingAddMoney') || (routes[0].name == 'GoodLuck') || (routes[0].name == 'BothTeamOpponentSelection') || (routes[0].name == 'CaptainViceCaptainSelection') || (routes[0].name == 'Wallet') || (routes[0].name == 'TotalResult') || (routes[0].name == 'Instructions')){
                    props.navigation.navigate('CricketLeague');
                  }
                  else{
                    props.navigation.goBack();
                  }
                }
                }>
                <View style={styles.backMenu}>
                  <Image style={styles.backIcon} source={BackIcon} />
                </View>
              </TouchableOpacity>

            </View>
            <Pressable onPress={()=>{
                  Functions.getInstance().fireAdjustEvent("7ujj31");
                  Functions.getInstance().fireFirebaseEvent('HomeLogo');
                  props.navigation.navigate('CricketLeague')
              }}>
              <View style={[styles.hdmdl,{marginRight : 25,marginTop : 2}]}>
                <Image style={styles.hlogo} source={HIcons} />
              </View>
            </Pressable>

            <View style={[styles.hdleft]}>
              {/* <View style={[styles.menu, styles.ntfn]}>
                <Image
                  style={[styles.menui, styles.ntfni]}
                  source={Notification}
                />
              </View> */}
            </View>
          </View>
        </View>
      </View>
      // </SafeAreaView>
    ),
  };
};

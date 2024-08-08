import React, { useEffect, useState } from 'react';
import { Alert, Image, Pressable, SafeAreaView, TouchableOpacity, View } from 'react-native';
import {DrawerIcon,HIcons,HelpIcon,Notification,dummyImage,} from '../../../assets';
import { DrawerActions } from '@react-navigation/native';
import { styles } from './Route.styles';
import UserStore from '../../stores/UserStore';
import Strip from './Strip';




export const CommonHeader = (props) => {
 

  return {
    header: () => (
          <Strip props={props} />


      // <View style={styles.scrnbg}>
      //   <View style={styles.header}>
      //     <View style={styles.hdlist}>
      //       <View style={styles.hdleft}>
      //         <TouchableOpacity
      //           onPress={() =>
      //             props.navigation.dispatch(DrawerActions.openDrawer())
      //           }>
      //           <View style={styles.menu}>
      //             <Image style={styles.menui} source={DrawerIcon} />
      //           </View>
      //         </TouchableOpacity>
      //         <View style={styles.user}>
      //           <TouchableOpacity
      //             onPress={() => 
      //               props.navigation.navigate('EditProfile')
      //             }
      //             >
      //             <Image
      //               style={styles.userp}
      //               source = { userPF ? {uri : userPF} :  require('../../../assets/images/dummy.png')}
      //             />
      //             <View style={styles.adot} />
      //           </TouchableOpacity>
      //         </View>
      //       </View>

      //       <Pressable onPress={()=>{props.navigation.navigate('DrawerStack')}}>
      //         <View style={styles.hdmdl}>
      //           <Image style={styles.hlogo} source={HIcons} />
      //         </View>
      //       </Pressable>

      //       <View style={[styles.hdleft]}>
      //         <View style={[styles.menu]}>
      //           <Image style={[styles.menui, styles.helpi]} source={HelpIcon} />
      //         </View>
      //         <View style={[styles.menu, styles.ntfn]}>
      //           <Image
      //             style={[styles.menui, styles.ntfni]}
      //             source={Notification}
      //           />
      //         </View>
      //       </View>
      //     </View>
      //   </View>
      // </View>
    ),
  };
};


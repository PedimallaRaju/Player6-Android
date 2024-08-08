import React, {useState} from 'react';
import {Image, Linking, Platform, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './Popup.styles';
import { CloseIcon, Location, LogoIcon } from '../../../assets';


const AppVersionUpdate = ({onClose}) => {
    const openSettings = () =>{
        if(Platform.OS = 'android'){
          // Linking.openURL("https://play.google.com/store/apps/details?id=com.player6");
          Linking.openURL("https://player6sports.com/thank-you/");
        }
        else{
          //
        }
        onClose();
    }
  return (
    
    <View style={{flex: 1}}>
      <Modal isVisible={true}>
        
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.ppscs}>
              {/* <TouchableOpacity onPress={onClose}>
                <View style={styles.crossimg}>
                  <Image style={styles.tmscrsimg} source={CloseIcon} />
                </View>
              </TouchableOpacity> */}
              <View style={styles.crtimg}>
                <Image style={{width:30,height :50,position:'relative', marginLeft : 10}} source={LogoIcon} />
              </View>
              <Text style={styles.sucstxt}>New Release Available</Text>
              <Text style={styles.sucsubtxt}>You are using an older version. Please uninstall & download the latest version of Player6 from our website.</Text>
              <TouchableOpacity onPress={() =>{openSettings()}}>
                <Text style={[styles.okbtn, styles.draftOk]}>Update</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>
    </View>
  );
};

export default AppVersionUpdate;

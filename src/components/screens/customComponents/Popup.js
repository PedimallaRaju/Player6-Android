import React, {useState} from 'react';
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './Popup.styles';
import { CloseIcon, Location } from '../../../assets';


const Popup = ({onClose}) => {
    const openSettings = () =>{
        Linking.openSettings();
        onClose();
    }
  return (
    
    <View style={{flex: 1}}>
      <Modal isVisible={true}>
        
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.ppscs}>
              <TouchableOpacity onPress={onClose}>
                <View style={styles.crossimg}>
                  <Image style={styles.tmscrsimg} source={CloseIcon} />
                </View>
              </TouchableOpacity>
              <View style={styles.crtimg}>
                <Image style={styles.tmsdimg} source={Location} />
              </View>
              <Text style={styles.sucstxt}>Access your location</Text>
              <Text style={styles.sucsubtxt}>Please access your location to proceed further</Text>
              <TouchableOpacity onPress={() =>{openSettings()}}>
                <Text style={[styles.okbtn, styles.draftOk]}>Enable Location</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Modal>
    </View>
  );
};

export default Popup;

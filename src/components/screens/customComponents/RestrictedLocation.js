import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './Popup.styles';
import { CloseIcon, RestrictedLocationIcon } from '../../../assets';


const RestrictedLocation = ({onClose}) => {
    
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
                <Image style={styles.tmsdimg} source={RestrictedLocationIcon} />
              </View>
              <Text style={styles.sucstxt}>Restricted Location Found</Text>
              <Text style={styles.sucsubtxt}>Sorry :{"("} We can't allow you to proceed further as you are a resident of a restricted state</Text>
            </View>
          </View>
      </Modal>
    </View>
  );
};

export default RestrictedLocation;

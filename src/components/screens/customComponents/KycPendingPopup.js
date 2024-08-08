import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './Popup.styles';
import { CloseIcon, InsufficientBalance, Option3, RestrictedLocationIcon } from '../../../assets';


const KycPendingPopup = ({onClose, onYes}) => {
    
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
                <Image style={[styles.tmsdimg]} source={Option3} />
              </View>
              <Text style={[styles.sucsubtxt, {marginTop : 15}]}> To add money verify your address and get ₹30 bonus!!</Text>
              <View style={{display : 'flex'}}>
                <TouchableOpacity onPress={onYes}>
                    <Text style={[styles.okbtn, styles.draftOk]}>Verify Address</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
      </Modal>
    </View>
  );
};

export default KycPendingPopup;

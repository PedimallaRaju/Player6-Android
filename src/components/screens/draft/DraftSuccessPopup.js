import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {CorrectIcon} from '../../../assets';
import Modal from 'react-native-modal';
import { styles } from './Draft.styles';



const DraftSuccessPopup = ({isVisible, closePopup}) => {
  
  return (
    <View style={{flex: 1}}>
      <Modal isVisible={isVisible}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.ppscs}>
            <View style={styles.crtimg}>
              <Image style={styles.tmsdimg} source={CorrectIcon} />
            </View>
            <Text style={styles.sucstxt}>Your Draft is Successfully Saved</Text>
            <TouchableOpacity onPress={() => closePopup()}>
              <Text style={[styles.okbtn, styles.draftOk]}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DraftSuccessPopup;

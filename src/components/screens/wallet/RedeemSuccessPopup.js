import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from '../draft/Draft.styles';
import { CorrectIcon } from '../../../assets';



const RedeemSuccessPopup = ({isVisible, closePopup}) => {
  
  return (
    <View style={{flex: 1}}>
      <Modal isVisible={isVisible}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.ppscs}>
            <View style={styles.crtimg}>
              <Image style={styles.tmsdimg} source={CorrectIcon} />
            </View>
            <Text style={[styles.sucstxt, {width:'80%'}]}>Your Redeem Has Been Completed Successfully. It will take some time to reflect the amount in your bank a/c</Text>
            <TouchableOpacity onPress={() => closePopup()}>
              <Text style={[styles.okbtn, styles.draftOk]}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default RedeemSuccessPopup;

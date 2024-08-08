import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from '../customComponents/Popup.styles';
import { CorrectIcon } from '../../../assets';


const BankSuccessPopup = ({navigation, onClose}) => {
    const [open, setOpen] = useState(true);
  return (
    <View style={{flex: 1}}>
      <Modal isVisible={true}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.ppscs}>
            <View style={styles.crtimg}>
              <Image style={styles.tmsdimg} source={CorrectIcon} />
            </View>
            <Text style={styles.sucstxt}>Your Bank Account has been successfully verified</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.okbtn, styles.draftOk]}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default BankSuccessPopup;

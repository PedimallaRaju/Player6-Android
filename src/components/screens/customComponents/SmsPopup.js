import React, {useState} from 'react';
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './Popup.styles';
import { CorrectIcon } from '../../../assets';


const SmsPopup = (isVisible) => {
    const [open, setOpen] = useState(isVisible);
    const openSettings = () =>{
        setOpen(false);
        Linking.openSettings();
    }
  return (
    <View style={{flex: 1}}>
      <Modal isVisible={open}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.ppscs}>
            <View style={styles.crtimg}>
              <Image style={styles.tmsdimg} source={CorrectIcon} />
            </View>
            <Text style={styles.sucstxt}>Need SMS Permissions</Text>
            <TouchableOpacity onPress={() =>{openSettings()}}>
              <Text style={[styles.okbtn, styles.draftOk]}>Enable</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default SmsPopup;

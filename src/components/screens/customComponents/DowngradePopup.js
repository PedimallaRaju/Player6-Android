import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './Popup.styles';
import { CloseIcon, DownGrade, RestrictedLocationIcon } from '../../../assets';


const DowngradePopup = ({onClose, onYes}) => {
    
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
                <Image style={styles.tmsdimg} source={DownGrade} />
              </View>
              <Text style={styles.sucstxt}>Sure to switch contest</Text>
              <Text style={styles.sucsubtxt}>You will switch to a lower contest, and the balance will be refunded to your wallet</Text>
              <View style={{display : 'flex'}}>
                <TouchableOpacity onPress={onYes}>
                    <Text style={[styles.okbtn, styles.draftOk]}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onClose} >
                    <Text style={[styles.okbtn, styles.draftOk, {backgroundColor : 'grey'}]}>No</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
      </Modal>
    </View>
  );
};

export default DowngradePopup;

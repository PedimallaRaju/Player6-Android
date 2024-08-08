import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './Popup.styles';
import { CloseIcon, DownGrade, InsufficientBalance} from '../../../assets';


const InsufficientWallet = ({onClose, onYes, amount}) => {
    
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
                <Image style={[styles.tmsdimg]} source={InsufficientBalance} />
              </View>
              <Text style={styles.sucstxt}>Insufficient Wallet Balance</Text>
              <Text style={styles.sucsubtxt}>To participate in this contest you need ₹{amount} in Withdrawable amount</Text>
              <View style={{display : 'flex'}}>
                <TouchableOpacity onPress={onYes}>
                    <Text style={[styles.okbtn, styles.draftOk]}>Add Money To Wallet</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
      </Modal>
    </View>
  );
};

export default InsufficientWallet;

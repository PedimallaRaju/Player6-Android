import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from '../customComponents/Popup.styles';
import { CorrectIcon, RedClose } from '../../../assets';
import UserStore from '../../stores/UserStore';


const KycRejected = ({navigation, onClose}) => {
    const [open, setOpen] = useState(true);
    const error = UserStore.getKycError();
  return (
    <View style={{flex: 1}}>
      <Modal isVisible={true}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.ppscs}>
            <View style={styles.crtimg}>
              <Image style={styles.tmsdimg} source={RedClose} />
            </View>
            {/* <Text style={styles.sucstxt}>Your KYC verification rejected</Text> */}
            <Text style={styles.sucstxt}>{error}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.okbtn, styles.draftOk]}>Okay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default KycRejected;

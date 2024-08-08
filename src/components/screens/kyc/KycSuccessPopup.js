import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from '../customComponents/Popup.styles';
import { CorrectIcon } from '../../../assets';
import UserStore from '../../stores/UserStore';


const KycSuccessPopup = ({navigation, onClose,imageSource}) => {
    const [open, setOpen] = useState(true);
    const success = UserStore.getKycSuccess();
    const btnText = UserStore.getkycBtnTitle();
  return (
    <View style={{flex: 1}}>
      <Modal isVisible={true}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={styles.ppscs}>
            <View style={styles.crtimg}>
            <Image
            style={{
              width: 60,
              height: 60,
              borderRadius: 60,
              // marginBottom: 50,
              alignItems: 'center',
              // paddingBottom:10
            }}
            //  style={styles.image} 
             source={imageSource || CorrectIcon} />
              {/* <Image style={styles.tmsdimg} source={CorrectIcon} /> */}
            </View>
            <Text style={[styles.sucstxt,{marginTop:20}]}>{success}</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={[styles.okbtn, styles.draftOk]}>{btnText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default KycSuccessPopup;

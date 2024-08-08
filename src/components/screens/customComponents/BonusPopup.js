import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Modal from 'react-native-modal';
import { styles } from './Popup.styles';
import { CloseIcon, DownGrade, InsufficientBalance,InsufficientBalanceNew} from '../../../assets';


const BonusPopup = ({onClose, onYes, amount}) => {
    
  return (
    
    <View style={{flex: 1}}>
      <Modal isVisible={true}>
        
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.ppscs}>
              <TouchableOpacity onPress={onClose}>
                <View style={{alignItems:'center',marginBottom:-30,
                   }}>
                  <Image 
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 60,
                    marginBottom: 0,
                    alignItems: 'center',
                  }}
                  //style={styles.tmscrsimg}
                  // resizeMode="center"
                  source={require('./Images/P6-icon-01.png')}
                  // source={CloseIcon}
                   />
                </View>
              </TouchableOpacity>
              <View style={styles.crtimg}>
                <Image style={[styles.tmsdimg]} source={InsufficientBalanceNew} />
              </View>
              <Text style={styles.sucstxt}>Congratulations!! You won ₹20 for signing up on Player6</Text>
              <View style={{display : 'flex'}}>
                <TouchableOpacity onPress={onYes}>
                    <Text style={[styles.okbtn, styles.draftOk]}>Claim</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
      </Modal>
    </View>
  );
};

export default BonusPopup;

import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useNotification } from './NotificationContext';
import { Close, Logo, LogoIcon, NoSquad, Playing11s, WaitForPlayer } from '../../../assets';
import { styles } from './CustomAlert.styles';
import Toast from 'react-native-toast-message';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';



const CustomAlert = ({ title, message, bgColor, style }) => {
  const notification = useNotification();
  return (
    <View style={[styles.container, { backgroundColor: bgColor}]}>
      {message == "Notification" ? 
      <View style={[styles.subContainer]}>
            <Image style={{width:40,height:40,backgroundColor:'black',borderRadius:50,resizeMode:'contain',alignSelf:'center',marginRight : 10}} source={LogoIcon} />
            <View style={{paddingRight:42}}>
                <Text style={{color : 'black'}}>Player 6</Text>
                <Text style={{color : 'black'}}>{title}</Text>
            </View>
      </View>


      :

      <View style={[styles.container, { backgroundColor: bgColor}]}>
      <View style={[styles.subContainer]}>
        {title == "Squads are yet to be announced!" ? 
          <Image style={styles.userp} source={NoSquad} />
         :
         title == "Waiting for playing 11's" ?
         <Image style={styles.userp} source={Playing11s} />
         :
         title == "Player selection begins shortly" ?
         <Image style={styles.userp} source={WaitForPlayer} />
         :
        "" }
        <Text style={styles.text}>{title}</Text>
        <TouchableOpacity style={{ width: '10%' }} onPress={() => {
            Toast.hide();
          }}>
              <Image source={Close} style={styles.closeIcon} resizeMode='contain'/>
        </TouchableOpacity>
      </View>
      {/* {message && <Text style={styles.text}>{message}</Text>} */}

    </View>



    }
    </View>

  );
};

export default CustomAlert;

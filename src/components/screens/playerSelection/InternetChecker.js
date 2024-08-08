import { View, Text, Image, TouchableOpacity, BackHandler } from 'react-native'
import React, { useEffect } from 'react'
import WithProgress from '../LoadingOverlay/WithProgress'
import { inject, observer } from 'mobx-react';
import { LowInternet } from '../../../assets';
import CustomButton from '../customComponents/CustomButton';
import { secondary } from '../../../style';
import { useFocusEffect } from '@react-navigation/native';

const InternetChecker = ({navigation}) => {


  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
        navigation.navigate('BettingAddMoney');
        console.log("pressesss")
        return true;
      });

      // Clean up the event listener when the component is unfocused or unmounted
      return () => {
        backHandler.remove();
      };
    }, [])
  );

  return (
    <View style={{backgroundColor : 'black', height: '100%'}}>
      <View style={{alignItems : 'center',marginTop : 200, padding : 20}}>
        <View style={{width:80, marginBottom : 15}}>
          <Image source={LowInternet} style={{alignSelf : 'center'}}/> 
        </View>
        
        <Text style={{color : 'white', textAlign:'center', fontSize : 14, fontFamily: 'Poppins-SemiBold',}}>Your internet is unstable</Text>
        <Text style={{color : 'white', textAlign:'center',fontSize : 12}}>Please ensure stable internet for this action</Text>
        <Text style={{color : 'white', textAlign:'center',fontSize : 12}}>Visit My Games page and try again.</Text>

        <TouchableOpacity onPress={()=>{navigation.navigate("BettingAddMoney")} }>
          <View style={[{fontSize : 12,marginTop : 30}]}>
              <Text style={{
                backgroundColor: '#279bff',
                borderRadius:10,
                paddingTop: 8,
                paddingBottom: 12,
                paddingHorizontal: 14,
                textAlign:'center',
                color :'#fff',
                marginLeft: 'auto',
              }}>Go To My Games</Text>
          </View>
        </TouchableOpacity>
      </View>


  </View>
  )
}

export default WithProgress(inject('UserStore')(observer(InternetChecker)));
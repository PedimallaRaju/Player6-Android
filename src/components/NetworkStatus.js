// NetworkStatus.js

import React, { useEffect, useState } from 'react';
import { View, Text, Image } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { styles } from './screens/customComponents/CustomAlert.styles';
import { NoSquad, Offline } from '../assets';

const NetworkStatus = () => {
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (isConnected) {
    return null; // Render nothing if connected
  }

  return (
    <View style={{ backgroundColor: 'black', }}>
        <View style={{ backgroundColor: '#e55656', borderBottomLeftRadius: 10, borderBottomRightRadius: 10}}>
            <View style={{justifyContent: 'center', alignItems : 'center', flexDirection: 'row'}}>
                <View > 
                    <Image style={styles.offline} source={Offline} />
                </View>
                <View style ={{ fontSize : 12, marginLeft : 10}}>
                    <Text style={[styles.text, {width : '100%'}]}>You are offline</Text>
                </View>
            </View>
        </View>
    </View>
  );
};

export default NetworkStatus;

    
import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import { MainBackground } from '../../../assets';

const BackgroundImage = ({children}) => {
    return (
      <>
        <ImageBackground
          source={MainBackground}
          style={{
            height: '100%',
            position: 'relative',
            width: '100%',
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: '100%',
          }}>
          {children}
        </View>
      </>
    );
  };
  
  export default BackgroundImage;
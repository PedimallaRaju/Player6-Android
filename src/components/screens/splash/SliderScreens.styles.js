import {Platform, StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";

export const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    right: 0,
    width: '100%',
    height: '100%',
  },
  appLogoContainer: {
    height: responsiveHeight(11),
    marginTop: responsiveHeight(11),
  },
  trophyImageContainer: {
    height: responsiveHeight(50),
  },
  trophyImgView: {
    width: responsiveWidth(78),
    height: responsiveHeight(48),
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'contain',
    marginTop: responsiveHeight(5),
  },
  dotsImgView: {
    marginTop: responsiveHeight(4),
  },
  getStartedButtonContainer: {
    padding: responsiveHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
    bottom: Platform.OS === 'android' ? responsiveHeight(1.7):32,
  },
  //Skip pager view styles
  skipText: {
    color: '#fff',
    fontSize: responsiveFontSize(1.8),
    textAlign: 'right',
    position: 'absolute',
    top: Platform.OS=== 'ios'? 43 : responsiveHeight(2),
    right: responsiveHeight(3),
  },
  dhoniImageContainer: {
    height: responsiveHeight(56),
  },
  appimgView: {
    width: responsiveHeight(22),
    height: responsiveWidth(22),
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'contain',
  },
  dotImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dhoniImgView: {
    width: '100%',
    height: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'contain',
  },
});

import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  appLogoContainer: {
    height: responsiveHeight(8),
    marginTop: responsiveHeight(13),
  },
  appimgView: {
    width: responsiveWidth(12),
    height: responsiveHeight(12),
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'contain',
  },
  trophyImgView: {
    width: responsiveWidth(78),
    height: responsiveHeight(47),
    marginLeft: 'auto',
    marginRight: 'auto',
    resizeMode: 'contain',
    marginTop: responsiveHeight(5),
  },
});

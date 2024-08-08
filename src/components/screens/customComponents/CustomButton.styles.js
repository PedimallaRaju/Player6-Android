import { StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  buttonContainer: {
    width: responsiveWidth(50),
    height: responsiveHeight(5.8),
    backgroundColor: '#246afe',
    borderStyle: 'solid',
    borderRadius: responsiveHeight(1),
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    lineHeight: 40,
  },
  label: {
    color: '#fff',
    fontFamily: 'Poppins-Bold',
    fontSize: responsiveFontSize(2),
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.6,
  },
});
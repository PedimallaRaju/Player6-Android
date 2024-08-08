import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
  inputs: {
    width: '100%',
    minHeight: responsiveHeight(6),
    borderColor: '#fff',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: responsiveHeight(1),
    paddingHorizontal: responsiveHeight(2),
    color: '#fff',
    fontSize: responsiveFontSize(1.5),
    fontFamily: 'Poppins-Regular',
    marginBottom: responsiveHeight(1.1),
  },
  errorInputs: {color: 'red', fontSize:responsiveFontSize(1.8)},
});

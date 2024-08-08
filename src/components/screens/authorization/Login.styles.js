import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-end',
  },
  keyboardAvoidingContainer: {
    width: '100%',
  },
  imageContentView: {
    width: responsiveWidth(7),
    height: responsiveHeight(4),
    marginLeft: responsiveHeight(1.5),
    marginTop: responsiveHeight(0.8),
  },
  fieldBetweentext: {
    fontStyle: 'italic',
    textAlign: 'center',
    fontSize: responsiveFontSize(1.9),
    color: '#fff',
    marginBottom: responsiveHeight(1),
  },
  footerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: responsiveHeight(6),
    marginHorizontal: responsiveHeight(1),
  },
  dontText: {
    color: '#fff',
    fontSize: responsiveFontSize(1.5),
    fontFamily: 'Poppins-Medium',
  },
  otpContainer: {
    marginTop: responsiveHeight(1),
    marginBottom: responsiveHeight(2.5),
  },
  loginformContainer: {
    width: responsiveWidth(100),
    backgroundColor: '#383838',
    borderTopLeftRadius: responsiveHeight(4),
    borderTopRightRadius: responsiveHeight(4),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: responsiveHeight(2.5),
  },
  dash: {
    width: responsiveWidth(20),
    height: responsiveHeight(1),
    backgroundColor: '#757575',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 'auto',
    marginLeft: 'auto',
    marginTop: responsiveHeight(1.2),
    marginBottom: responsiveHeight(4),
    borderRadius: responsiveHeight(2),
  },
  welcomeText: {
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    fontSize: responsiveFontSize(3.6),
  },
  verifyText: {
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    fontSize: responsiveFontSize(1.9),
    marginBottom: responsiveHeight(4),
  },
  signupText: {
    color: '#fff',
    fontSize: responsiveFontSize(1.5),
    fontFamily: 'Poppins-Medium',
    position: 'relative',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: '#afafaf',
  },
  cancelText: {
    color: '#fff',
    fontSize: responsiveFontSize(1.5),
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});

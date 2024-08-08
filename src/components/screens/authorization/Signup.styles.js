import { StyleSheet } from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
export const styles = StyleSheet.create({
      loginformContainer: {
        width: responsiveWidth(100),
        height: responsiveHeight(70),
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
        width:  responsiveWidth(20),
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
        fontFamily:'Poppins-SemiBold',
        fontSize: responsiveFontSize(3.6),
      },
      verifyText: {
        color: '#fff',
        fontFamily:'Poppins-Regular',
        fontSize: responsiveFontSize(1.9),
        marginBottom: responsiveHeight(4),
        marginLeft: responsiveHeight(0.5),
      },
      otpContainer: {
        marginTop: responsiveHeight(1.5),
        marginBottom: responsiveHeight(2.5),
      },
      footerTextContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: responsiveHeight(10),
        marginHorizontal: responsiveHeight(1),
      },
      alreadytext: {
        color: '#fff',
        fontSize: responsiveFontSize(1.4),
        fontFamily:'Poppins-Medium',
      },
      terms: {
        color: '#fff',
        fontSize: responsiveFontSize(1.4),
        fontFamily:'Poppins-Medium',
        // marginTop : 10,
        // marginBottom : 10
      },
      logintext: {
        color: '#fff',
        fontSize: responsiveFontSize(1.4),
        fontFamily:'Poppins-Medium',
        position: 'relative',
        textDecorationLine: 'underline',
        textDecorationStyle: 'solid',
        textDecorationColor: '#afafaf',
        marginBottom : 50
      },
      cancelText: {
        color: '#fff',
        fontSize: responsiveFontSize(1.5),
        fontFamily:'Poppins-Regular',
        textAlign: 'center',
      },
      backIcon:{
        width:18,
        left : 1,
        height:'100%',
        resizeMode: 'contain',
        alignItems : 'center',
        justifyContent : 'center'     
    },
    err : 
    {color: 'red', fontSize:responsiveFontSize(1.8)}
});

import { autoAction } from 'mobx/dist/internal';
import {StyleSheet} from 'react-native';
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
} from 'react-native-responsive-dimensions';
import { India } from '../../../assets';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    resizeMode:'cover'
  },
  textContent: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: responsiveFontSize(1.8),
    color: '#fff',
    textAlign: 'center',
    top: responsiveHeight(2),
    // backgroundColor:'rgb(255,255,255)',

  },
  teamSelectionMainContainer: {
    flex: 1,
    padding: responsiveHeight(7),
    marginTop: responsiveHeight(5),
    bottom: responsiveHeight(2),
  },
  button: {
    position: 'absolute',
    bottom: responsiveHeight(10),
    width: responsiveWidth(50),
    alignSelf: 'center',
    backgroundColor: '#279bff',
    borderRadius: responsiveHeight(7),
    paddingVertical: responsiveHeight(1),
    zIndex: 1,
  },
  textcnt : {
    marginBottom:100,
    backgroundColor:'rgba(250,250,250,0.2);',
    width:'70%',
    paddingBottom:30,
    borderRadius:10,
    marginLeft:60,
    position:'relative',
  },
  gudlk :{
    borderWidth:1,
    borderRadius:20,
    borderColor:'#fff',
    width:'70%',
    margin:50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(2.3),
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    paddingTop:5,
    paddingBottom:5,
  },
  like : {
   marginLeft:15,
   marginBottom:8,
  },
  cvctxt: {
    position: 'absolute',
    top: responsiveHeight(0),
    left: 30,
    backgroundColor: '#383838',
    color: '#fff',
    fontSize: responsiveFontSize(1.2),
    fontFamily: 'Poppins-Medium',
    width: 24,
    height: 24,
    borderRadius: 30,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 18,
  },
  tmsdimg: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  plyrnames: {
    position: 'absolute',
    // bottom: responsiveHeight(0),
    top:  responsiveHeight(6),
    backgroundColor: '#383838',
    color: '#fff',
    fontSize: responsiveFontSize(1.3),
    fontFamily: 'Poppins-SemiBold',
    borderRadius: responsiveHeight(5),
    textAlign: 'center',
    width: responsiveWidth(26),
    flexWrap:'wrap',
    paddingLeft:10,
    paddingRight:10,
    // paddingHorizontal:10,
  },
  tmsitem: {
    flexBasis: '50%',
    marginTop: responsiveHeight(4),
    marginBottom: responsiveHeight(5),
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    position: 'relative',
  },
  tmsplyr: {
    width: 40,
    height: 40,
    borderRadius: responsiveHeight(11),
    borderWidth: responsiveWidth(0.5),
    borderColor: '#fff',
    borderStyle: 'solid',
  },
  plyrimg: {
    borderRadius: responsiveHeight(100),
  },
  mainContainer: {
    backgroundColor: 'transparent',
    height: '100%',
    position: 'relative',
  },

  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
});

import {StyleSheet} from 'react-native';
import { graybg, primary } from '../../../style';

export const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#111',
  },
  headingdText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 14,
  },
  headerContainer: {
    backgroundColor: '#111111',
    paddingHorizontal: 14,
    paddingVertical: 18,
    marginBottom: 130,
  },
  countryBox: {
    paddingVertical: 10,
    backgroundColor: '#383838',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 7,
  },
  countryBoxTopHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: '#404040',
    borderStyle: 'dotted',
    marginBottom: 4,
  },
  teamLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexBasis: '30%',
  },
  teamsImage: {
    width: 28,
    height: 28,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  teamLeftNameText: {
    fontSize: 11,
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    textAlign: 'left',
  },
  teamsImageStyle: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  teamName: {
    flexDirection: 'row',
    flexBasis: '70%',
  },
  timerBox: {
    width: 74,
    backgroundColor: '#fff',
    borderRadius: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  timerText: {
    textAlign: 'center',
    color: '#279bff',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  timerTextOrange: {
    textAlign: 'center',
    color: '#e79013',
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  teamRight: {
    alignItems: 'center',
    flexBasis: '30%',
    flexDirection: 'row-reverse',
  },
  teamRightImage: {
    width: 28,
    height: 28,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 0,
    marginLeft: 7,
  },
  teamRightTextContainer: {
    flexDirection: 'row',
    flexBasis: '70%',
    justifyContent: 'flex-end',
  },
  playerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: '100%',
  },

  playerContentBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    flexBasis: '49%',
  },
  wnrtxt: {
    marginBottom: 16,
  },
  tmname: {
    marginBottom: 0,
    // textAlign: 'center',
  },
  tmtletl: {
    textAlign: 'left',
  },
  teamnm: {
    fontSize: 11,
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    // textAlign: 'center',
    // flex:1
    // maxWidth: '80%',
  },
  tmrht: {
    justifyContent: 'flex-end',
  },
  tmlft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexBasis: '30%',
  },
  ctmslct: {
    flexBasis: '30%',
  },
  tmrtxt: {
    color: '#279bff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 0,
  },
  secondheader: {
    paddingVertical: 7,
    borderBottomWidth: 0,
    borderColor: '#171717',
    borderStyle: 'solid',
    marginBottom: 5,
  },
  secondHeaderList: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  secondHeaderContent: {
    backgroundColor: '#383838',
    paddingHorizontal: 12,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  secondHeaderContentText: {
    color: '#fff',
    fontSize: 9,
    fontFamily: 'Poppins-Medium',
  },
  borderTopBlueWidth: {
    borderTopWidth: 3,
    borderTopColor: '#246afe',
  },
  borderTopOrangeWidth: {
    borderTopWidth: 3,
    borderTopColor: 'orange',
  },
  frsttm: {
    marginRight: 7,
  },
  vctmslct: {
    flexDirection: 'row-reverse',
  },

  ptmr: {
    width: 92,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },
  tmtle: {
    marginBottom: 16,
    textAlign: 'center',
  },

  btmlist: {
    flexBasis: '50%',
  },
  tmrtm: {
    width: 74,
  },

  pktmr: {
    fontSize: 14,
  },
  tmsimg: {
    width: 28,
    height: 28,
    borderRadius: 100,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  indmain: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  tma: {
    flexBasis: '49%',
  },
  ptkmain: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  tmchk: {
    flexDirection: 'row',
    flexBasis: '70%',
  },

  scndtm: {
    marginRight: 0,
    marginLeft: 7,
  },
  pntlist: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flexBasis: '68%',
  },
  orngpick: {
    backgroundColor: '#e79013',
  },
  pntitem: {
    width: 12,
    height: 12,
    borderRadius: 20,
    backgroundColor: '#5a5a5a',
    padding: 3,
    marginRight: 5,
    marginBottom: 5,
  },
  ppicked: {
    backgroundColor: '#279bff',
  },
  opicked: {
    backgroundColor: '#E99014',
  },
  sltm: {
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    width: 64,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tmplyrlft2: {
    flexBasis: '100%',
  },
  tchkrht: {
    justifyContent: 'flex-end',
  },
  tmchk2: {
    flexBasis: '60%',
  },
  tmtletl2: {
    textAlign: 'right',
  },
  nxtfix: {
    paddingTop: 12,
    paddingBottom: 16,
    borderTopColor: '#3d3d3d',
    borderTopWidth: 1,
    borderStyle: 'solid',
    backgroundColor: '#111',
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 14,
  },
  ticklist: {
    flexBasis: '100%',
    marginVertical: 5,
  },
  nxtfixbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 110,
    backgroundColor: '#279bff',
    paddingVertical: 11,
    borderRadius: 8,
    marginLeft: 'auto',
  },
  nxtbtn: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    color: '#fff',
  },
  tmplyrlft: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#383838',
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: 7,
    marginStart: 5,
    marginEnd: 2.5,
    borderTopWidth: 3,
    borderTopColor: '#2d2d2d',
    borderStyle: 'solid',
    flex: 1,
    paddingRight:16,
    height:90
  },
  plyrtm: {
    backgroundColor: '#2d2d2d',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 14,
    width: 35,
    textAlign: 'center',
  },
  wtick: {
    width: '100%',
    height: '100%',
  },
  pkop: {
    backgroundColor: '#279bff',
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  picon: {
    width: 7,
    height: 7,
    marginRight: 5,
  },
  plyrprflinfo: {
    flexDirection: 'row',
  },
  slist: {
    justifyContent: 'flex-end',
  },
  plyrprfl: {
    width: 33,
    height: 33,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2d2d2d',
    borderStyle: 'solid',
    overflow: 'hidden',
    marginRight: 5,
  },
  dotp: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    width: '100%',
  },
  dotimg: {
    width: 2,
    height: 65,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  dotp2: {
    width: '70%',
    top: '7%',
  },
  plyrname: {
    marginBottom: 3,
    overflow:'hidden',
    width:100,
    height:35
  },
  pteam: {
    width: 50,
    height: 50,
  },
  pmtch: {
    paddingVertical: 0,
    marginBottom: 16,
  },
  tmtxt: {
    fontSize: 13,
  },
  team: {
    flexBasis: 40,
    alignItems: 'center',
  },
  mtchtm: {
    flexBasis: 120,
  },
  teamvw: {
    width: 30,
    height: 30,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#4c4c4c',
    overflow: 'hidden',
    marginBottom: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tmimg: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  plyrlftprfl: {
    marginRight: 0,
    marginBottom: 4,
    width: 32,
    height: 32,
  },
  plyrsd: {
    fontSize: 7,
    width: 30,
  },
  plyrlft: {
    flexBasis: '34%',
    marginRight: 10,
  },
  plyrruns: {
    fontSize: 10,
    textAlign: 'left',
    // marginBottom: 3,
  },
  plyrrank: {
    backgroundColor: '#2d2d2d',
    paddingHorizontal: 0,
    paddingVertical: 2,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 8,
    maxWidth: 60,
  },
  adplyr: {
    width: 16,
    height: 16,
    borderRadius: 50,
    backgroundColor: '#5a5a5a',
    position: 'absolute',
    right: 5,
    // top:50,
    bottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adplusimg: {
    width: 10,
    height: 10,
  },
  ortxt: {
    color: '#fff',
    fontSize: 9,
    fontFamily: 'Poppins-Medium',
  },
  disabledButton: {
    opacity: 0.5,
  },
  disable: {
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.3,
    backgroundColor: '#fff',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  headingText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    // paddingBottom: 3,
  },
  ennum: {
    // marginTop:50,
    color: '#fff',
    position: 'relative',
    bottom: 0,
  },

  ppscs: {
    width: '84%',
    backgroundColor: graybg,
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  crtimg: {
    width: 30,
    height: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  sucstxt: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: primary,
    marginBottom: 14,
    width: '60%',
    marginLeft: 'auto',
    marginRight: 'auto',
    textAlign: 'center',
  },

});

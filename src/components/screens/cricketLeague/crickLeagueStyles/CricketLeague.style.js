import {StyleSheet} from 'react-native';
import { secondary } from '../../../../style';

export const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#111111',
  },
  mainContainer: {
    backgroundColor: '#111111',
    paddingHorizontal: 14,
    paddingVertical: 18,
    flex: 1,
    paddingBottom: 30,
    marginTop : 60
  },
  headingText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    // paddingBottom: 3,
  },
  contest: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#383838',
    marginBottom: 12,
  },
  contentContainer: {
    paddingTop: 10,
    paddingBottom: 60,
  },
  slide: {
    width: '100%',
    height: 180,
    borderRadius: 14,
    // overflow: 'hidden',
    marginBottom: 10,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
    marginBottom: 50,
    borderRadius: 10,
  },
  ennum: {
    // marginTop:50,
    color: '#fff',
    position: 'relative',
    bottom: 0,
  },
  tmitm: {
    position: 'absolute',
    bottom: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems:'center',
    alignSelf: 'center',
    width: '60%',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  lfttm: {
    flexBasis: '40%',
    textAlign: 'center',
    fontSize: 11,
    // backgroundColor:'blue',
  },
  rhtitm: {
    flexBasis: '40%',
    textAlign: 'center',
    fontSize: 11,
    // backgroundColor:'green',
  },
  mnmain: {
    position: 'absolute',
    top: 50,
    marginLeft: 'auto',
    marginRight: 'auto',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignSelf: 'center',
    width: '68%',
  },
  mnimg: {
    width: 40,
    height: 40,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#fff',
    
  },
  tcnr: {
    textAlign: 'center',
    marginTop: 7,
  },
  tmtxy: {
    fontSize: 11,
  },



  // Contest Page Stylings
  contestContainer: {
    backgroundColor: '#383838',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  contestText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
  },
  contestList: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    marginBottom: 7,
  },
  chooseButton: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  chooseButtonText: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  termsCondition: {
    fontSize: 8,
    color: '#fff',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  contestItem: {
    flexBasis: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#279bff',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 6,
  },
  chscnst: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  plynw: {
    fontSize: 16,
  },
  chstxt: {
    fontSize: 14,
    color: '#1e232d',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  activeContestItem: {
    flexBasis: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 6,
  },
  activeContestText: {
    fontFamily: 'Roboto-Bold',
    fontSize: 17,
    color: '#279bff',
    textAlign: 'center',
  },
  disabled:{
    backgroundColor: 'rgb(189, 188, 188)',
    flexBasis: '48%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 6,
  },



  //////// Entry Fee Stylings ///////////////


  feecontainer: {
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#383838',
    marginBottom: 12,
  },
  cntstmain:{
    backgroundColor:'#383838',
    borderRadius:12,
    paddingVertical:10,
    paddingHorizontal:10,
},
chstxt:{
    fontSize:14,
    color:'#1e232d',
    fontFamily:'Poppins-SemiBold',
    textAlign:'center',
},
slctd:{
    fontSize:16,
    color:'#fff',
    marginBottom:12,
},
entrylist:{
    backgroundColor:'#279bff',
    borderRadius:8,
    paddingVertical:14,
    marginBottom:10,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
},
entryitem:{
    flexBasis:'50%',
    borderRightWidth:1,
    borderRightColor:'#4dadff',
    borderStyle:'solid',
},
erun:{
    color:'#fff',
    marginBottom:10,
},
eruntxt:{
    fontSize:19,
},
cnstxt:{
    fontFamily:'Roboto-Bold',
    fontSize:17,
    color:'#fff',
    textAlign:'center',
},
afln:{
    borderRightWidth:0,
},
chscnst:{
    backgroundColor:'#fff',
    borderRadius:8,
    paddingVertical:10,
    paddingHorizontal:10,
    marginBottom:10,
},
plynw:{
    fontSize:16,
},
trmcndn:{
    fontSize:8,
    color:'#fff',
    fontFamily:'Poppins-Regular',
    textAlign:'center',
},



////// Find Opponent //////////////////

opponent: {
  paddingBottom: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#383838',
  marginBottom: 12,
},
opmn: {
  borderBottomWidth: 0,
},
cntstmain: {
  backgroundColor: '#383838',
  borderRadius: 12,
  paddingVertical: 10,
  paddingHorizontal: 10,
},
chstxt: {
  fontSize: 14,
  color: '#1e232d',
  fontFamily: 'Poppins-SemiBold',
  textAlign: 'center',
},
slctd: {
  fontSize: 16,
  color: '#fff',
  marginBottom: 12,
},
opslcn: {
  flexDirection: 'row',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginBottom: 15,
},
opslcnitem: {
  flexBasis: '49%',
},
slcnprfl: {
  width: 63,
  height: 63,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 40,
  borderWidth: 2,
  borderColor: '#585858',
  borderStyle: 'solid',
  backgroundColor: '#4b4b4b',
  marginBottom: 10,
  marginLeft: 'auto',
  marginRight: 'auto',
},
prflimg: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
  borderRadius: 100,
},
slcntxt: {
  fontSize: 13,
  color: '#fff',
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
chscnst: {
  backgroundColor: '#fff',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 10,
  marginBottom: 10,
},
wrm: {
  backgroundColor: '##279bff',
},
wrim: {
  color: '#fff'
},
plynw: {
  fontSize: 16,
},


///////////// Game Room /////////////////////////

gamecontainer: {
  paddingBottom: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#383838',
  marginBottom: 12,
},
open: {
  borderBottomWidth: 0,
},
gameOnContainer: {
  backgroundColor: 'transparent',
  paddingVertical: 14,
},
contentContainer: {
  backgroundColor: '#383838',
  paddingHorizontal: 10,
},
bannerStripContainer: {
  marginBottom: 0,
},
bannerImage: {
  width: '100%',
  height: 40,
  position: 'relative',
},
bannerText: {
  position: 'relative',
  top: -37,
  marginBottom: 0,
},
text: {
  fontSize: 14,
  color: '#1e232d',
  fontFamily: 'Poppins-SemiBold',
  textAlign: 'center',
},
selected: {
  fontSize: 16,
  color: '#fff',
  marginBottom: 12,
},
chooseGameContainer: {
  backgroundColor: '#fff',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 10,
  marginBottom: 10,
},
helmetContainer: {
  width: '100%',
  resizeMode: 'cover',
},
helmetImage: {
  width: 270,
  height: 100,
  marginLeft: 'auto',
  marginRight: 'auto',
},
playNow: {
  fontSize: 16,
},
warm: {
  backgroundColor: '#279bff',
},
warmText: {
  color: '#fff',
},
openGame: {
  marginBottom: 0,
},
backgroundImage: {
  position: 'relative',
  width: '100%',
},
image: {
  marginBottom: 8,
  borderRadius: 15,
  width: '100%',
  height: '100%',
},


///////////////// Select Team For Toss ////////////////////////////

teamcontest: {
  paddingBottom: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#383838',
  marginBottom: 12,
},
opmn: {
  borderBottomWidth: 0,
},
contestMain: {
  backgroundColor: '#383838',
  borderRadius: 12,
  paddingVertical: 10,
  paddingHorizontal: 10,
},
mainText: {
  fontSize: 14,
  color: '#1e232d',
  fontFamily: 'Poppins-SemiBold',
  textAlign: 'center',
},
pickTeam: {
  paddingVertical: 14,
},
selectedText: {
  fontSize: 16,
  color: '#fff',
  marginBottom: 12,
},
pickText: {
  paddingHorizontal: 40,
},
matchCard: {
  backgroundColor: '#383838',
  borderRadius: 16,
  minHeight: 75,
  marginBottom: 10,
  paddingVertical: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
},
team: {
  flexBasis: 40,
  alignItems: 'center',
},
teamView: {
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
pickTeamView: {
  width: 35,
  height: 35,
  // position:'absolute',
  marginBottom: -53,
},
blnk: {
  elevation: 8,
  width: 38,
  height: 38,
  borderWidth:3,
  borderColor: secondary,
  shadowColor: secondary,
  shadowOpacity: 1,
  shadowRadius: 2,
  bottom : 1
},
tctblnlk: {
  marginTop: 60,
},
teamTimerText: {
  color: '#279bff',
  fontSize: 15,
  fontFamily: 'Poppins-SemiBold',
  marginBottom: 0,
},
matchTime: {
  flexBasis: 150,
},
pickTimer: {
  width: 130,
  backgroundColor: '#fff',
  paddingHorizontal: 14,
  paddingVertical: 5,
  borderRadius: 30,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginBottom: 20,
},
onpg:{
  marginBottom:0,
  marginTop:10,
},
chooseContest: {
  backgroundColor: '#fff',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 10,
  marginBottom: 10,
  marginTop: 10,
},
openGame: {
  marginBottom: 0,
},
teamImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},
teamText: {
  fontSize: 13,
},
winnerText: {
  marginBottom: 16,
},
teamName: {
  fontSize: 10,
  color: '#fff',
  fontFamily: 'Poppins-Medium',
  textAlign: 'center',
},
pickMatch: {
  paddingVertical: 0,
  marginBottom: 16,
},
waitingRoom: {
  backgroundColor: '#279bff',
},
waitingRoomText: {
  color: '#fff',
},
playNow: {
  fontSize: 16,
},



//////////////////////// Opponent Choose Toss ///////////////////

opponentcontainer: {
  paddingBottom: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#383838',
  marginBottom: 12,
},
open: {
  borderBottomWidth: 0,
},
playNow: {
  fontSize: 16,
},
waitingRoomText: {
  color: '#fff',
},
chooseContest: {
  backgroundColor: '#fff',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 10,
  marginBottom: 10,
  marginTop: 10,
},
waitingRoom: {
  backgroundColor: '#279bff',
},
team: {
  flexBasis: 40,
  alignItems: 'center',
},
// pickTeamView: {
//   width: 50,
//   height: 50,
// },
teamText: {
  fontSize: 13,
},
teamName: {
  fontSize: 11,
  color: '#fff',
  fontFamily: 'Poppins-Medium',
  textAlign: 'center',
},
teamImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
},
teamView: {
  width: 30,
  height: 30,
  borderRadius: 50,
  borderWidth: 3,
  borderColor: '#4c4c4c',
  overflow: 'hidden',
  marginBottom: 7,
  alignItems: 'center',
  justifyContent: 'center',
},
openGame: {
  marginBottom: 0,
},
mainText: {
  fontSize: 14,
  color: '#1e232d',
  fontFamily: 'Poppins-SemiBold',
  textAlign: 'center',
},
cntstmain: {
  backgroundColor: '#383838',
  borderRadius: 12,
  paddingVertical: 10,
  paddingHorizontal: 10,
},
pktm: {
  paddingVertical: 14,
},
chstxt: {
  fontSize: 14,
  color: '#1e232d',
  fontFamily: 'Poppins-SemiBold',
  textAlign: 'center',
},
slctd: {
  fontSize: 16,
  color: '#fff',
  marginBottom: 12,
},
ptmtxt: {
  paddingHorizontal: 40,
},
mtchcard: {
  backgroundColor: '#383838',
  borderRadius: 16,
  minHeight: 75,
  marginBottom: 10,
  paddingVertical: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
},
pmtch: {
  paddingVertical: 0,
  marginBottom: 16,
},

ptmr: {
  width: 92,
  backgroundColor: '#fff',
  paddingHorizontal: 20,
  paddingVertical: 5,
  borderRadius: 30,
  marginBottom: 20,
},
teamnm: {
  fontSize: 11,
  color: '#fff',
  fontFamily: 'Poppins-Medium',
  textAlign: 'center',
},
tmrtxt: {
  color: '#279bff',
  fontSize: 16,
  fontFamily: 'Poppins-SemiBold',
  marginBottom: 0,
},
wnrtxt: {
  marginBottom: 16,
},
chscnst: {
  backgroundColor: '#fff',
  borderRadius: 8,
  paddingVertical: 10,
  paddingHorizontal: 10,
  marginBottom: 10,
},
wrm: {
  backgroundColor: '#279bff',
},
opchsts: {
  backgroundColor: '#5f5f5f',
},
wrim: {
  color: '#fff',
},
matchTime: {
  flexBasis: 120,
},
// pickTimer: {
//   backgroundColor: '#fff',
//   paddingHorizontal: 20,
//   paddingVertical: 5,
//   borderRadius: 30,
//   marginLeft: 'auto',
//   marginRight: 'auto',
//   marginBottom: 20,
// },
teamTimerText: {
  color: '#279bff',
  fontSize: 16,
  fontFamily: 'Poppins-SemiBold',
  marginBottom: 0,
},



////////////////////// Toss Won //////////////////////////
tosswoncontainer: {
  paddingBottom: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#383838',
  marginBottom: 12,
},
open: {
  borderBottomWidth: 0,
},
cntstmain:{
  backgroundColor:'#383838',
  borderRadius:12,
  paddingVertical:10,
  paddingHorizontal:10,
},
pktm:{
  paddingVertical:14,
},
chstxt:{
  fontSize:14,
  color:'#1e232d',
  fontFamily:'Poppins-SemiBold',
  textAlign:'center',
},
slctd:{
  fontSize:16,
  color:'#fff',
  marginBottom:12,
},
celb:{
  width:130,
  height:150,
  marginLeft:'auto',
  marginRight:'auto',
  marginVertical:10,
  // position:'relative',
  alignItems:'center',
  justifyContent:'center',
},
celbimg:{
  width:'100%',
  height:'100%',
},
teamvw:{
  width:30,
  height:30,
  borderRadius:50,
  borderWidth:2,
  borderColor:'#4c4c4c',
  overflow:'hidden',
  marginBottom:7,
  alignItems:'center',
  justifyContent:'center',
},
pteam:{
  width:50,
  height:50,
},
twintm:{
  position:'absolute',
  textAlign:'center',
  top:'30%',
  borderWidth:0,
  width:60,
  height:60,
},
tmimg:{
  width:'100%',
  height:'100%',
  resizeMode:'cover',
},
twnimg:{
  width:'100%',
  height:'100%', 
},
teamnm:{
  fontSize:11,
  color:'#fff',
  fontFamily:'Poppins-Medium',
  textAlign:'center',
},
wnrtxt:{
  marginBottom:16,
},
chscnst:{
  backgroundColor:'#fff',
  borderRadius:8,
  paddingVertical:10,
  paddingHorizontal:10,
  marginBottom:10,
},
wrm:{
  backgroundColor:'#279bff',
},
opngm:{
  marginBottom:0,
},
plynw:{
  fontSize:16,
},
wrim:{
  color:'#fff'
},





////////////////////////// Toss Loss ////////////////////////////
tosslosscontainer: {
  paddingBottom: 16,
  borderBottomWidth: 1,
  borderBottomColor: '#383838',
  marginBottom: 12,
},
open: {
  borderBottomWidth: 0,
},
contentContainer: {
  backgroundColor: '#383838',
  borderRadius: 12,
  paddingVertical: 10,
  paddingHorizontal: 10,
},
pickTeam: {
  paddingVertical: 14,
},
text: {
  fontSize: 14,
  color: '#1e232d',
  fontFamily: 'Poppins-SemiBold',
  textAlign: 'center',
},
selected: {
  fontSize: 16,
  color: '#fff',
  marginBottom: 12,
},
celebration: {
  width: 130,
  height: 150,
  marginLeft: 'auto',
  marginRight: 'auto',
  marginVertical: 10,
  alignItems: 'center',
  justifyContent: 'center',
},
celebrationImage: {
  width: '100%',
  height: '100%',
},
dislike: {
  width: 80,
  height: 75,
  marginVertical: 20,
},
teamName: {
  fontSize: 11,
  color: '#fff',
  fontFamily: 'Poppins-Medium',
  textAlign: 'center',
},
winnerText: {
  marginBottom: 16,
},
lossTossText: {
  fontSize: 12,
},
opslavlbl: {
  backgroundColor:'#279bff',
  borderRadius: 10,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: 10,
},
opslblw:{
  textAlign:'center',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  borderRightWidth:1,
  borderRightColor:'#4dadff',
  borderStyle:'solid',
  flexBasis:'55%',
},
opslblww:{
  textAlign:'center',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  flexBasis:'45%',
},
opslfee: {
  fontSize: 15,
  color: '#fff',
  fontFamily: 'Poppins-Medium',
},
opslrepe: {
  fontSize: 18,
  color: '#fff',
  fontFamily: 'Poppins-SemiBold',
},
opslonlne: {
  backgroundColor:'#0569b0',
  borderRadius: 20,
  padding: 5,
  marginRight:24,
},
opslmdl: {
  fontSize: 12,
  color: '#fff',
  fontFamily: 'Poppins-SemiBold',
},
available : {
 
},


});

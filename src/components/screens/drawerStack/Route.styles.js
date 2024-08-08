import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    bottomContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        left: 0,
        height: 60,
        zIndex: 99999999,
        elebation: 0,
        backgroundColor: '#383838',
        inactiveBackgroundColor: 'red',
        activeTintColor: 'green',
        justifyContent: 'space-between',
        borderTopColor: '#383838',
        
    },
    bottomNavText: {
        color: '#fff',
        fontSize: 8,
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        // color:focused ? 'magenta' :'green',
    },
    iconView: {
        width: 50,
        height: 50,
        borderRadius: 120,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#111',
        borderWidth: 2,
        borderColor: '#55575b',
        borderStyle: 'solid',
        // marginBottom: 10,
    },
    iconImageStyle: {
        width: 20,
        height: 35,
        
    },
    historyImage: {
        position: 'relative', width: 16, height: 16, resizeMode: 'contain', marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    draftImage: {
        position: 'relative', width: 22, height: 18, resizeMode: 'contain', marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    walletImage: {
        position: 'relative', width: 18, height: 14, resizeMode: 'contain', marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    myGamesIcon: {
        position: 'relative', width: 12, height: 16, resizeMode: 'contain', marginBottom: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    screenViewContainer: {
        width: 60, height: 60, alignItems: 'center', justifyContent: 'center',
    },
    bottomViewBottom: {
        width: 30, height: 2, marginLeft: 'auto', marginRight: 'auto', position: 'absolute', bottom: 1
    }, hdleft:{
        flexDirection:'row',
    },
    helpi:{
        width:14,
    },
    ntfni:{
        width:11,
    },
    ntfn:{
        marginRight:0,
    },
    user:{
        width:25,
        height:25,
        borderRadius:50,
        backgroundColor:'#ccc',
        // overflow:'hidden',
    },
    userp:{
        width:'100%',
        height:'100%',
        resizeMode: 'cover',
        borderRadius:100,     
    },
    scrnbg:{
        backgroundColor:'#111111',
        
    },
    header:{
        minHeight:66,
        borderBottomColor:'#414141',
        borderBottomWidth:1,
        paddingTop:28,
        paddingBottom:12,
        paddingHorizontal:14,
        backgroundColor:'#111111',
        // flexDirection:'row',
        // alignItems:'end',
        // justifyContent:'space-between',
        // width:'100%',
        // position:'sticky',
        top:0,
        zIndex:999999,
        left:0,
        right:0,
    },
    
    hdlist:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        position:'relative',
        // zIndex:999,
    },
    menu:{
        width:23,
        height:23,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:5,
        backgroundColor:'#303030',
        marginRight:7,
    },
    backMenu:{
        width:23,
        height:23,
        marginRight:7,
    },
    menui:{
        width:15,
        height:'100%',
        resizeMode: 'contain',      
    },
    backIcon:{
        width:10,
        height:'100%',
        resizeMode: 'contain',      
    },
    adot:{
        width:6,
        height:6,
        backgroundColor:'#279bff',
        borderRadius:50,
        position:'absolute',
        right:0,
        bottom:0,
        borderColor:'#000',
        borderWidth:1,
        borderStyle:'solid',
        zIndex:999999,
    },
    hdmdl:{
        height:14,
        width:100,
        // position:'absolute',
        // left:0,
        // right:0,
        // zIndex:9,
        marginLeft:'auto',
        marginRight:'auto',
        textAlign:'center',
    },
    hlogo:{
        width:'100%',
        height:'100%',
        resizeMode: 'contain',
    },
   
});

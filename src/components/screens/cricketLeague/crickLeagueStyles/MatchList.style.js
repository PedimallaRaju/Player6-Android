import { StyleSheet } from 'react-native';
import { responsiveHeight } from 'react-native-responsive-dimensions';

export const styles = StyleSheet.create({
    rnghd: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginBottom: responsiveHeight(2),
        // marginTop:responsiveHeight(2)
    },
    rnghdlft: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    frbl: {
        width: 34,
        height: 32,
        marginRight: 8,
    },
    hdtxte: {
        marginBottom: 0,
    },
    mtchcard: {
        backgroundColor: '#383838',
        borderRadius: 16,
        minHeight: 75,
        marginTop: 5,
        // marginBottom: 10,
        paddingVertical: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    mtchab: {
        fontSize: 10,
    },
    vs: {
        paddingHorizontal: 7,
        color: '#111',
        backgroundColor: '#fff',
        borderRadius: 15,
        width: '100%',
        textAlign: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    tmng: {
        fontSize: 10,
    },
    viewAllContainer: {
        flex: 1, alignItems: 'flex-end',
    },
    team: {
        flexBasis: 55,
        alignItems: 'center',
    },
    mtchtm: {
        flexBasis: 180,
    },
    teamnm: {
        fontSize: 12,
        color: '#fff',
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        margin: 1.2,
        textTransform: 'uppercase',
    },
    tmw:{
        width : 14,
    },
    hdtxt: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'Poppins-SemiBold',
         marginBottom: 14,
    },
    teamvw: {
        width: 30,
        height: 30,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: '#4c4c4c',
        overflow: 'hidden',
        marginBottom: 4,
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    tmimg: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    contentContainer: {
        paddingTop: 10,
    },
    mtchcardupper: {
        backgroundColor: '#383838',
        borderRadius: 16,
        marginBottom: 10,
        flexDirection: 'column',
    },
    mtchcardhdr: {
        paddingLeft:12,
        paddingRight:12 ,
        paddingTop:0,
        paddingBottom:0,
        backgroundColor: '#525151',
        borderTopLeftRadius:16,
        borderTopRightRadius:16,
    },
    teamtxt: {
        fontSize: 12,
        color: '#fff',
        fontFamily: 'Poppins-Medium',
        width: '80%'
    },
    mtchcardqlfr: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: 'center',
    },
    teamcap: {
        width: 22,
        height: 22,
        justifyContent: 'center',
    },





});

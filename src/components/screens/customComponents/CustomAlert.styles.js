import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
  container: {
    width: '95%',
    minHeight: '60%',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    paddingLeft: 5,
    paddingVertical:10,
    width: '80%',
  },
  subContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  closeIcon:{
    width: 12,
    height: 12,
    position:'absolute',
    left:15,
    top:15,
  },
  userp:{
    width:40,
    height:40,
    borderRadius:50,
    marginRight : 10,     
},
offline:{
  width: 25,
  height:25,
  resizeMode: 'contain',
  marginTop : 8,
  marginBottom : 5
},
});

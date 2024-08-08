import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#383838',
    marginTop: 10,
    borderRadius: 10,
    height: 150,
  },
  leftContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
 
  },
  rightContainer: {
    flex: 1,
    backgroundColor: '#4C4C4C',
    borderBottomEndRadius: 10,
    borderTopEndRadius: 10,
  },
  heading: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  mainHeading: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subHeading: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 9,
    marginTop: 4,
  },
  plyrprfl: {
    width: 35,
    height: 35,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2d2d2d',
    borderStyle: 'solid',
    overflow: 'hidden',
    marginRight: 5,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  rightImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'center',
  },
  teamName: {
    color: 'white',
    fontSize: 12,
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: 4,
  },
  vsText: {
    color: 'white',
    fontSize: 8,
    fontWeight: 'bold',
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingVertical: 4,
    marginHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#5B5B5B',
  },
  row: {
    flexDirection: 'row',
  },
  teamContainer: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  mainContainer: {flex: 1, backgroundColor: 'black'},
  subContainer: {flex: 1, marginTop: 20, marginHorizontal: 10},
  listContainer: {flex: 1, marginTop: 5, marginBottom: 70},
  flex: {
    flex: 1,
  },
});

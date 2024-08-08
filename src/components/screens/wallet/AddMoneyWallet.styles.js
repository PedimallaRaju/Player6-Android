import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  scrollViewContainer: {flex: 1, backgroundColor: '#111111'},
  mainContainer: {
    flex: 1,
    backgroundColor: '#111111',
    padding: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    marginLeft: 20,
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  selectAmountContainer: {
    height: 120,
    marginTop: 10,
    padding: 15,
    backgroundColor: '#383838',
    borderRadius: 12,
  },
  moneyContainer: {
    flex: 1,
  },
  renderMoneyContainer: {flex: 1, flexDirection: 'row'},
  boxHeader: {
    fontSize: 11,
    color: '#fff',
    fontFamily: 'Poppins-Medium',
    marginLeft: 5,
  },
  box: {
    borderRadius: 10,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 5, // Add margin between the boxes
  },
  boxText: {
    color: '#279bff',
    fontFamily: 'Poppins-Medium',
    alignItems: 'center',
    fontSize: 18,
    fontWeight: '800',
  },
  inputFieldContainer: {
    marginTop: 10,
  },
  inputFieldWrapper: {
    borderRadius: 8,
    overflow: 'hidden', // Ensure the border radius is applied correctly
  },
  inputField: {
    backgroundColor: '#fff',
    color: '#000',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
  },
  buttonMainContainer: {flex: 2, marginTop: 30},
  buttonContainer: {
    alignSelf: 'center',
    width: '60%',
    backgroundColor: '#279bff',
    borderRadius: 8,
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  backgroundBagImages: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 80,
  },
});

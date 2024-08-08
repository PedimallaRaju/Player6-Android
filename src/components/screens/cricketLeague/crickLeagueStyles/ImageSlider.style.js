import {StyleSheet} from 'react-native';
import { secondary } from '../../../../style';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  imageContainer: {
    width: '100%',
    height: 180,
    overflow: 'hidden',
  },
  slide: {
    width: '100%',
    height: '90%',
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 7,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  paginationDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#383838',
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: secondary,
  },
});
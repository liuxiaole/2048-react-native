import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
  gameOver: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.6)'
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#776e65'
  },
  tryAgainBtn: {
    marginHorizontal: 140,
    borderRadius: 5,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 28,
    paddingRight: 28,
    borderColor: '#776e65',
    borderWidth: 2
  },
  tryAgainBtnText: {
    fontWeight: 'bold',
    fontSize: 22,
    color: '#776e65'
  }
});

export default styles;

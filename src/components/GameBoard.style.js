import { StyleSheet, Dimensions } from 'react-native';

let {width: vw, height: vh} = Dimensions.get('window');
let width = 490;
let height = vh / vw * width;
let scale = vw / 490;

const styles = StyleSheet.create({
  gameBoard: {
    height, width,
    padding: 20,
    paddingTop: 30,
    transform: [{
      translateX: (vw - width) / 2
    }, {
      translateY: (vh - height) / 2
    }, {
      scale
    }],
    backgroundColor: '#faf8ef'
  },
  gameBox: {
    width: 450,
    height: 450,
    padding: 10,
    backgroundColor: '#bbada0',
    borderRadius: 5,
    position: 'relative'
  },
  gridContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  gridCell: {
    width: 100,
    height: 100,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: 'rgba(238, 228, 218, 0.35)'
  }
});

export default styles;

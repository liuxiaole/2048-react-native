import { StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  tileContainer: {
    position: 'absolute',
    left: 10,
    top: 10,
    right: 10,
    bottom: 10
  },
  tile: {
    position: 'absolute',
    top: 0,
    left: 0
  },
  tileInner: {
    width: 100,
    height: 100,
    lineHeight: 100,
    textAlign: 'center',
    fontSize: 56,
    fontWeight: 'bold',
    color: '#776e65',
    borderRadius: 5,
    overflow: 'hidden'
  },
  tileNew: {

  },
  tileMerged: {
    zIndex: 1
  },
  tileInner2: {
    backgroundColor: '#eee4da'
  },
  tileInner4: {
    backgroundColor: '#ede0c8'
  },
  tileInner8: {
    color: '#f9f6f2',
    backgroundColor: '#f2b179'
  },
  tileInner16: {
    color: '#f9f6f2',
    backgroundColor: '#f59563'
  },
  tileInner32: {
    color: '#f9f6f2',
    backgroundColor: '#f67c5f'
  },
  tileInner64: {
    color: '#f9f6f2',
    backgroundColor: '#f65e3b'
  },
  tileInner128: {
    fontSize: 48,
    color: '#f9f6f2',
    backgroundColor: '#edcf72'
  },
  tileInner256: {
    fontSize: 48,
    color: '#f9f6f2',
    backgroundColor: '#edcc61'
  },
  tileInner512: {
    fontSize: 48,
    color: '#f9f6f2',
    backgroundColor: '#edc850'
  },
  tileInner1024: {
    fontSize: 36,
    color: '#f9f6f2',
    backgroundColor: '#edc53f'
  },
  tileInner2048: {
    fontSize: 36,
    color: '#f9f6f2',
    backgroundColor: '#edc22e'
  }
});

Animatable.initializeRegistryWithDefinitions({
  tileNew: {
    from: {
      transform: [{
        scale: 0
      }]
    },
    to: {
      transform: [{
        scale: 1
      }]
    }
  },
  tileMerged: {
    from: {
      transform: [{
        scale: 0
      }]
    },
    '0.96': {
      transform: [{
        scale: 1.16
      }]
    },
    to: {
      transform: [{
        scale: 1
      }]
    },
  }
});

export default styles;

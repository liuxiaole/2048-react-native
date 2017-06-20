import { StyleSheet, Dimensions } from 'react-native';
import * as Animatable from 'react-native-animatable';

const styles = StyleSheet.create({
  headerBox: {
    height: 130,
  },
  flexBox: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  colorText: {
    color: '#776e65'
  },
  title: {
    width: '46%',
    fontSize: 72
  },
  descText: {
    marginTop: 12,
    marginBottom: 12,
    fontSize: 16
  },
  bold: {
    fontWeight: 'bold'
  },
  newGameBtn: {
    borderWidth: 0,
    paddingTop: 12,
    paddingBottom: 12,
    width: '25%',
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: '#847363'
  },
  newGameBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  scoreBox: {
    width: '25%',
    position: 'relative',
    backgroundColor: '#bbada0',
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 5
  },
  scoreLabel: {
    textAlign: 'center',
    color: '#faf8ef',
    fontSize: 14
  },
  scoreContent: {
    textAlign: 'center',
    fontSize: 28,
    color: 'white'
  },
  additionScore: {
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: 26,
    color: '#776e65',
    position: 'absolute'
  }
});

Animatable.initializeRegistryWithDefinitions({
  rising: {
    from: {
      opacity: 1,
      transform: [{
        translateY: 0
      }]
    },
    0.5: {
      opacity: 1,
      transform: [{
        translateY: -20
      }]
    },
    to: {
      opacity: 0,
      transform: [{
        translateY: -40
      }]
    }
  }
});

export default styles;

import React from 'react';
import PropTypes from 'prop-types';
import { View, Text } from 'react-native';
import Button from 'apsl-react-native-button';
import { startNewGame } from '../actions';
import { connect } from 'react-redux';
import styles from './GameOver.style';
import * as Animatable from 'react-native-animatable';

let GameOver = ({dispatch}) => {
  return (
    <Animatable.View
      animation="zoomIn"
      duration={300}
      easing="ease-in"
      style={styles.gameOver}
    >
      <Text style={styles.title}>Game Over!</Text>
      <Button style={styles.tryAgainBtn} onPress={() => dispatch(startNewGame())}>
        <Text style={styles.tryAgainBtnText}>Try Again</Text>
      </Button>
    </Animatable.View>
  );
};

GameOver.propTypes = {
  dispatch: PropTypes.func.isRequired
};

export default connect()(GameOver);

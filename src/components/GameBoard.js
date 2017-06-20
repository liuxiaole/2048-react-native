import React from 'react';
import { View } from 'react-native';
import HeaderBox from './HeaderBox';
import GameOver from './GameOver';
import Tiles from './Tiles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styles from './GameBoard.style';

const BackgroundGrids = ({size}) => {
  let row = i => {
    return new Array(size).fill().map((_, j) =>
      <View style={styles.gridCell} key={`grid-cell-${i * size + j}`}></View>
    );
  };
  let grids = new Array(size).fill().map((_, i) => row(i));

  return (
    <View style={styles.gridContainer}>{grids}</View>
  );
};

BackgroundGrids.propTypes = {
  size: PropTypes.number.isRequired
};

const GameBoard = (props) => (
  <View style={styles.gameBoard}>
    <HeaderBox />
    <View style={styles.gameBox}>
      <BackgroundGrids size={props.size}/>
      <Tiles/>
      {props.gameOver && <GameOver />}
    </View>
  </View>
);

GameBoard.propTypes = {
  size: PropTypes.number.isRequired,
  gameOver: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    size: state.size,
    gameOver: state.gameStatus === 'over'
  };
};

export default connect(mapStateToProps)(GameBoard);

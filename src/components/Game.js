import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import GameBoard from './GameBoard';
import Swipeable from './Swipeable';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { deepEach } from '../utils';
import PropTypes from 'prop-types';

let SwipeableGameBoard = Swipeable({
  threshold: 1
})(GameBoard);

class Game extends Component {
  static propTypes = {
    startNewGame: PropTypes.func.isRequired,
    setGameOver: PropTypes.func.isRequired,
    generateNewTile: PropTypes.func.isRequired,
    moveChessBoard: PropTypes.func.isRequired,
    addScore: PropTypes.func.isRequired,
    updateBestScore: PropTypes.func.isRequired,
    gameStarted: PropTypes.bool.isRequired,
    size: PropTypes.number.isRequired,
    tiles: PropTypes.array.isRequired,
    score: PropTypes.number.isRequired
  };

  componentDidMount () {
    this.props.startNewGame();
    this.loadBestScore();
  }

  async loadBestScore() {
    let score;
    try {
      score = await AsyncStorage.getItem('bestScore');
      score = JSON.parse(score);
    }catch(e){}

    if(score){
      this.updateBestScore(score);
    }
  }

  move (dir) {
    if (this.isMoving) return;
    let {movingPromise, score} = this.props.moveChessBoard(dir);
    if (movingPromise) {
      this.isMoving = true;
      movingPromise.then(() => {
        score && this.props.addScore(score);
        this.props.generateNewTile()
          .then(() => {
            this.checkGameStatus();
            this.isMoving = false;
          });
      });
    }
  }

  isMovable () {
    let movable = false;
    let { tiles, size } = this.props;
    // check each tile,
    // if there is any empty tile, sets movable to true
    // if there is any adjacent tile which has the same number, sets movable to true
    deepEach(tiles, tile => {
      if (movable) return; // break;
      if (!tile) {
        movable = true;
        return;
      }
      let {row: i, col: j} = tile;
      if (i < size - 1) {
        let bottomTile = tiles[i+1][j];
        if (bottomTile && bottomTile.number === tile.number) {
          movable = true;
          return;
        }
      }

      if (j < size - 1) {
        let rightTile = tiles[i][j+1];
        if (rightTile && rightTile.number === tile.number) {
          movable = true;
          return;
        }
      }
    });

    return movable;
  }

  checkGameStatus () {
    if (!this.isMovable()) {
      // game over
      this.props.updateBestScore(this.props.score);
      this.props.setGameOver();
    }
  }

  render () {
    return <SwipeableGameBoard
      onSwipe={dir => this.move(dir)}
    />;
  }
}


const mapStateToProps = (state) => {
  return {
    size: state.size,
    tiles: state.tiles,
    score: state.scores.score,
    gameStarted: state.gameStatus === 'playing'
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startNewGame: () => dispatch(actions.startNewGame()),
    setGameOver: () => dispatch(actions.setGameOver()),
    generateNewTile: () => dispatch(actions.generateNewTile()),
    moveChessBoard: dir => dispatch(actions.moveChessBoard(dir)),
    addScore: score => dispatch(actions.addScore(score)),
    updateBestScore: score => dispatch(actions.updateBestScore(score))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Game);

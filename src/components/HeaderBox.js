import React from 'react';
import { View, Text, TouchableHighlight} from 'react-native';
import Button from 'apsl-react-native-button';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cleanRecentAddedScore, startNewGame } from '../actions';
import * as Animatable from 'react-native-animatable';
import styles from './HeaderBox.style';

const ScoreBox = ({ label, score, children }) => {
  return (
    <View style={styles.scoreBox}>
      <Text style={[styles.scoreLabel, styles.bold]}>{label}</Text>
      <Text style={[styles.scoreContent, styles.bold]}>{score}</Text>
      {children}
    </View>
  );
};

ScoreBox.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired
};

const HeaderBox = (props) => {
  return (
    <View style={styles.headerBox}>
      <View style={styles.flexBox}>
        <Text style={[styles.title, styles.bold, styles.colorText]}>2048</Text>
        <ScoreBox score={props.score} label="SCORE">
        {
          props.recentAddedScores.map((score) =>
            <Animatable.Text
              style={styles.additionScore}
              key={score.id}
              animation={"rising"}
              onAnimationEnd={(e) => props.onAnimationEnd(score.id)}
            >+{score.score}</Animatable.Text>
          )
        }
        </ScoreBox>
        <ScoreBox score={props.bestScore} label="BEST" />
      </View>
      <View style={styles.flexBox}>
        <View style={styles.descTxt}>
          <Text style={[styles.bold, styles.colorText]}>Play 2048 Game Online</Text>
          <Text style={styles.colorText}>Join the numbers and get to the
            <Text style={[styles.bold, styles.colorText]}> 2048 tile!</Text>
           </Text>
        </View>
        <Button
          style={styles.newGameBtn}
          onPress={props.startNewGame}
          activeOpacity={0.5}
          title="New Game"><Text style={styles.newGameBtnText}>New Game</Text>
        </Button>
      </View>
    </View>
  );
};

HeaderBox.propTypes = {
  recentAddedScores: PropTypes.array.isRequired,
  bestScore: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  onAnimationEnd: PropTypes.func.isRequired,
  startNewGame: PropTypes.func.isRequired
};


const mapStateToProps = ({scores}) => scores;

const mapDispatchToProps = (dispatch) => {
  return {
    onAnimationEnd: id => dispatch(cleanRecentAddedScore(id)),
    startNewGame: () => dispatch(startNewGame())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HeaderBox);

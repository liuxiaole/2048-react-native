import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import * as Animatable from 'react-native-animatable';
import * as actions from '../actions';
import flatten from 'lodash.flatten';
import { connect } from 'react-redux';
import styles from './Tiles.style';


const TILE_WIDTH = 100;
const TILE_GAP = 10;

let Tile = class Tile extends React.Component {
  render() {
    let props = this.props;
    let {col, row} = props;

    let x = col * ( TILE_WIDTH + TILE_GAP);
    let y = row * ( TILE_WIDTH + TILE_GAP);
    let transform = [
      {translateX: x},
      {translateY: y}
    ];
    let animation = props.newGenerated ? 'tileNew' : ( props.newMerged ? 'tileMerged': '' );
    return (
      <Animatable.View
        duration={100}
        transition={["translateX", "translateY"]}
        style={[styles.tile, { transform, zIndex: props.newMerged ? 1: 0 }]}
        easing="ease-in"
      >
        <Animatable.Text
          duration={200}
          animation={animation}
          style={[styles.tileInner, styles[`tileInner${props.number}`]]}
          onAnimationEnd={() => {
            this.props.onAnimationEnd(animation, this.props.row, this.props.col)
          }}
        >{props.number}</Animatable.Text>
      </Animatable.View>
    );
  }
};

Tile.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  number: PropTypes.number.isRequired,
  newGenerated: PropTypes.bool.isRequired,
  newMerged: PropTypes.bool.isRequired,
  onAnimationEnd: PropTypes.func.isRequired
};

const mapDispatchToTileProps = (dispatch) => {
  return {
    onAnimationEnd(animationName, row, col) {
      // designed in css file
      if (animationName === 'tileNew') {
        dispatch(actions.resetNewGeneratedTileTag({ col, row }));
      } else if(animationName === 'tileMerged') {
        dispatch(actions.resetNewMergedTileTag({ col, row }));
      }
    }
  };
};

Tile = connect(null, mapDispatchToTileProps)(Tile);


const Tiles = ({flatTiles}) => (
  <View style={styles.tileContainer}>{flatTiles.map(tile =>
    <Tile key={'tile-'+tile.uuid} {...tile}></Tile>
  )}</View>
);

Tiles.propTypes = {
  flatTiles: PropTypes.array.isRequired
};

const flattenTiles = tiles => {
  let flatTiles = [];
  flatten(tiles).filter(tile => !!tile).forEach(tile => {
    flatTiles.push(tile);
    if(tile.tileToMerge) {
      flatTiles.push(tile.tileToMerge);
    }
  });
  return flatTiles.sort((tile1, tile2) => tile1.uuid > tile2.uuid ? 1 : -1);
};

const mapStateToProps = ({tiles}) => {
  return {
    flatTiles: flattenTiles(tiles)
  };
};

export default connect(mapStateToProps)(Tiles);

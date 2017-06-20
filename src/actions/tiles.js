import * as ActionTypes from './action-types';
import { v4 } from 'react-native-uuid';
import flatten from 'lodash.flatten';
import { sleep } from '../utils';

const getRandomCoordinate = tiles => {
  let emptyTiles = flatten(tiles.map((rows, i) => rows.map((tile, j) => {
    if(tile) return null;
    return [i, j];
  }))).filter(tile => !!tile);

  if (emptyTiles.length) {
    let index = Math.floor(Math.random() * emptyTiles.length);
    let [row, col] = emptyTiles[index];
    return {row, col};
  }
  return null;
};

export const generateNewTile = () => (dispatch, getState) => {
  let { tiles } = getState();
  let coord = getRandomCoordinate(tiles);
  if (coord) {
    dispatch({
      type: ActionTypes.GENERATE_NEW_TILE,
      number: Math.random() > 0.8 ? 4 : 2,
      uuid: v4(),
      ...coord
    });
  }
  return sleep(0);
};

export const moveTile = (payload /*={row, col, destRow, destCol}*/) => (dispatch) => {
  let {row, col, destRow, destCol} = payload;
  dispatch({
    type: ActionTypes.MOVE_TILE,
    ...payload
  });
  return sleep(100).then(() => payload);
};

export const preMergeTile = (payload /*={row, col, destRow, destCol}*/) => {
  return {
    type: ActionTypes.PRE_MERGE_TILE,
    ...payload
  };
};

export const mergeTile = ({row, col}) => {
  return {
    type: ActionTypes.MERGE_TILE,
    row, col
  };
};

export const resetNewMergedTileTag = ({row, col}) => {
  return {
    type: ActionTypes.RESET_NEW_MERGED_TILE_TAG,
    row, col
  };
};

export const resetNewGeneratedTileTag = ({row, col}) => {
  return {
    type: ActionTypes.RESET_NEW_GENERATED_TILE_TAG,
    row, col
  };
};


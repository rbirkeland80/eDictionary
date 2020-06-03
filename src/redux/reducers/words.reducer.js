import { findIndex } from 'ramda';

import { CHECK, LEARN } from '../../constants/listTypes.constants';
import ActionTypes from '../actions';

const {
  FETCH_WORDS_SUCCESS,
  UPDATE_WORD_SUCCESS
} = ActionTypes;

const initialState = {
  [`${CHECK}`]: null,
  [`${LEARN}`]: null,
  item: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WORDS_SUCCESS: {
      const { data, listType } = action.payload;

      return {
        ...state,
        [listType]: data
      };
    }

    case UPDATE_WORD_SUCCESS: {
      const { data, listType } = action.payload;
      const index = findIndex(w => w._id === data._id, state[listType].list);
      const newList = [ ...state[listType].list ];
      newList[index] = data;

      return {
        ...state,
        [listType]: {
          ...state[listType],
          list: newList
        }
      }
    }

    default:
      return state;
  }
};

import { findIndex } from 'ramda';

import ActionTypes from '../actions';

const {
  FETCH_WORDS_SUCCESS,
  UPDATE_WORD_SUCCESS
} = ActionTypes;

const initialState = {
  list: null,
  item: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_WORDS_SUCCESS:
      return {
        ...state,
        list: action.payload,
      };

    case UPDATE_WORD_SUCCESS:
      const updated = action.payload;
      const index = findIndex(w => w._id === updated._id, state.list.list);
      const newList = [ ...state.list.list ];
      newList[index] = updated;
console.log(action.payload, index, newList)
      return {
        ...state,
        list: {
          ...state.list,
          list: newList
        }
      }

    default:
      return state;
  }
};

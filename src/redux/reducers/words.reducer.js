import { clone, findIndex, remove } from 'ramda';

import { CHECK, LEARN } from '../../constants/listTypes.constants';
import ActionTypes from '../actions';

const {
  DELETE_WORD_SUCCESS,
  FETCH_WORDS_SUCCESS,
  GENERATE_QUIZ_SUCCESS,
  GET_WORD_SUCCESS,
  UPDATE_WORD_SUCCESS,
  VERIFY_QUIZ_SUCCESS
} = ActionTypes;

const initialState = {
  [`${CHECK}`]: null,
  [`${LEARN}`]: null,
  item: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case DELETE_WORD_SUCCESS: {
      const { data, listType } = action.payload;
      const oldList = [ ...state[listType].list ]
      const index = findIndex(w => w._id === data._id, oldList);
      const newList = remove(index, 1, oldList);

      return {
        ...state,
        [listType]: {
          ...state[listType],
          list: newList,
          count: state[listType].count - 1
        }
      };
    }

    case FETCH_WORDS_SUCCESS:
    case GENERATE_QUIZ_SUCCESS: {
      const { data, listType } = action.payload;

      return {
        ...state,
        [listType]: data
      };
    }

    case GET_WORD_SUCCESS: {
      return {
        ...state,
        item: action.payload
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

    case VERIFY_QUIZ_SUCCESS: {
      const checkList = clone(state[`${CHECK}`]);
      checkList.list.forEach(i => i.lastVerifiedAt = new Date());

      return {
        ...state,
        [`${CHECK}`]: checkList
      }
    }

    default:
      return state;
  }
};

import { ascend, clone, descend, findIndex, prop, remove, reverse, sort } from 'ramda';
import { differenceInMinutes } from 'date-fns';

import { CHECK, LEARN } from '../../constants/listTypes.constants';
import ActionTypes from '../actions';

const {
  DELETE_WORD_SUCCESS,
  FETCH_WORDS_SUCCESS,
  GENERATE_QUIZ_SUCCESS,
  GET_WORD_SUCCESS,
  SORT_WORDS,
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

    case SORT_WORDS: {
      const { listType, column, sortDirection } = action.payload;
      const newList = sortLocally(state[listType].list, column, sortDirection);

      return {
        ...state,
        [listType]: {
          ...state[listType],
          list: newList
        }
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

function sortLocally(list, column, sortDirection) {
  switch (column.type) {
    case 'bool': {
      const byProp = sortDirection === 'asc'
        ? descend(prop(column.prop))
        : ascend(prop(column.prop));

      return sort(byProp, list);
    }

    case 'date': {
      const sorted = sort((a, b) => {
        const date1 = a[column.prop] && new Date(a[column.prop]);
        const date2 = b[column.prop] && new Date(b[column.prop]);

        if (!date1 && !date2) {
          return 0;
        }

        if (date1 && date2) {
          console.log(differenceInMinutes(date1, date2));
          return differenceInMinutes(date1, date2);
        }

        return date1 ? 1 : -1;
      }, list);

      return sortDirection === 'asc' ? sorted : reverse(sorted);
    }

    default: {
      const byProp = sortDirection === 'asc'
        ? ascend(prop(column.prop))
        : descend(prop(column.prop));

      return sort(byProp, list);
    }
  }
}
